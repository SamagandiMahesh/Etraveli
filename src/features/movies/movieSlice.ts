import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Movie, MovieLayoutState, MovieResponse } from './Movie.types';
import { calculateAverageRating } from '../../utils/utils';


// Initial state
const initialState: MovieLayoutState = {
    movieList: [],
    isLoading: false,
    isImgLoading: false,
    error: null,
    imgError: null,
    filterText: '',
    sortCriteria: 'Episode',
    imageList: {},
};


// Async thunk to fetch the list of movies
export const fetchMovieList = createAsyncThunk<Movie[], void, { rejectValue: string }>(
    'movieLayout/fetchMovieList',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.get('https://swapi.py4e.com/api/films/?format=json');
            const movies: MovieResponse[] = response.data.results;

            // Transform the movie data into a simplified format
            const movieData: Movie[] = movies.map(movie => ({
                id: movie.episode_id,
                summary: movie.opening_crawl,
                title: movie.title,
                director: movie.director,
                releaseDate: movie.release_date,
                releaseYear: new Date(movie.release_date).getFullYear(),
            }));

            const ratings = await Promise.all(
                movieData.map(movie =>
                    dispatch(fetchMovieRating({ title: movie.title, releaseYear: movie.releaseYear }))
                )
            );

            movieData.forEach((movie, index) => {
                movie.ratings = ratings[index].payload?.Ratings || [];
                movie.episode = ratings[index].payload?.Title || '';
                movie.averageRating = calculateAverageRating(movie.ratings || []) ?? 0;
                movie.imdbId = ratings[index].payload?.imdbID || '';
            });

            return movieData;
        } catch (error) {
            return rejectWithValue('Failed to fetch movie list');
        }
    }
);

// Async thunk to fetch ratings for a specific movie
export const fetchMovieRating = createAsyncThunk<any, { title: string; releaseYear: number }, { rejectValue: string }>(
    'movieLayout/fetchMovieRating',
    async ({ title, releaseYear }, { rejectWithValue }) => {
        try {
            const apiKey = process.env.NEXT_PUBLIC_API_KEY;
            console.log({apiKey});
            const response = await axios.get(`https://www.omdbapi.com/?apikey=b9a5e69d&t=${title}&y=${releaseYear}`);
            return response.data;
        } catch (error) {
            return rejectWithValue('Failed to fetch movie ratings');
        }
    }
);

export const fetchMoviePoster = createAsyncThunk<any, { id: number }, { rejectValue: string }>(
    'movieLayout/fetchMoviePoster',
    async ({ id }, { rejectWithValue }) => {
        try {
            const apiKey = process.env.NEXT_PUBLIC_API_KEY;
            const response = await axios.get(`https://img.omdbapi.com/?apikey=${apiKey}&i=${id}`, {
                responseType: 'blob', // Important to handle the response as a blob
              });
            return URL.createObjectURL(response.data);
        } catch (error) {
            return rejectWithValue('Failed to fetch movie poster');
        }
    }
);


// Create the slice
const movieSlice = createSlice({
    name: 'movieLayout',
    initialState,
    reducers: {
        setFilterText(state, action) {
            state.filterText = action.payload;
        },
        setSortCriteria(state, action) {
            state.sortCriteria = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovieList.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchMovieList.fulfilled, (state, action: PayloadAction<Movie[]>) => {
                state.movieList = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchMovieList.rejected, (state, action) => {
                state.error = action.payload ?? 'Failed to fetch movie list';
                state.isLoading = false;
            })
            .addCase(fetchMoviePoster.pending, (state) => {
                state.isImgLoading = true;
                state.imgError = null;
            })
            .addCase(fetchMoviePoster.fulfilled, (state, action: PayloadAction<Movie[]>) => {
                state.imageList = {
                    ...state.imageList,
                    [(action as any).meta.arg.id]: action.payload,
                };

                console.log(action, state);
                state.isImgLoading = false;
            })
            .addCase(fetchMoviePoster.rejected, (state, action) => {
                state.error = action.payload ?? 'Failed to fetch movie poster';
                state.isImgLoading = false;
            });
    },
});

export const selectFilteredAndSortedMovies = createSelector(
    [(state) => state.movies.movieList, (state) => state.movies.filterText, (state) => state.movies.sortCriteria],
    (movieList, filterText, sortCriteria) => {
        return movieList
            .filter((movie: Movie) => movie.title.toLowerCase().includes(filterText.toLowerCase()))
            .sort((a: Movie, b: Movie) => {
                switch (sortCriteria) {
                    case 'Year':
                        return a.releaseYear - b.releaseYear;
                    case 'Episode':
                        return (a.episode || '').localeCompare(b.episode || '');
                    case 'Ratings':
                        return (b.averageRating || 0) - (a.averageRating || 0);
                    default:
                        return 0;
                }
            });
    }
);

export const { setFilterText, setSortCriteria } = movieSlice.actions;
export default movieSlice.reducer;

