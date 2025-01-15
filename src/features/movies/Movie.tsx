import type React from "react"
import { useEffect, useState } from "react"
import { useAppDispatch } from "../../app/hooks"
import {
  fetchMovieList,
  fetchMoviePoster,
  selectFilteredAndSortedMovies,
  setFilterText,
  setSortCriteria,
} from "./movieSlice"
import type { RootState } from "../../app/store"
import MovieDetails from "../movieDetails/MovieDetails"
import MovieList from "../movieList/MovieList"
import { useAppSelector } from "../../app/hooks"
import { StyledMovieLayout } from "./Movies.styles"
import type { Movie } from "./Movie.types"


const MovieComponent: React.FC = () => {

  const dispatch = useAppDispatch()
  const { isLoading, error, imageList } = useAppSelector((state: RootState) => state.movies)
  const filteredMovies = useAppSelector(selectFilteredAndSortedMovies)
  console.log(filteredMovies)

  const [selectedMovieIndex, setSelectedMovieIndex] = useState<number | null>(
    null,
  )

  useEffect(() => {
    dispatch(fetchMovieList())
  }, [dispatch])

  const handleMovieSelection = (index: number) => {
    setSelectedMovieIndex(index)
    if (!imageList[filteredMovies[index].imdbId]) {
      dispatch(fetchMoviePoster({id: filteredMovies[index].imdbId}));
    }
  }

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterText(event.target.value))
  }

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortCriteria(event.target.value))
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <StyledMovieLayout>
      <div className="controls">
        <select onChange={handleSortChange}>
          <option> Sort by</option>
          <option value="Year">Year</option>
          <option value="Episode">Episode</option>
          <option value="Ratings">Ratings</option>
        </select>
        <input
          type="text"
          placeholder="Type to filter..."
          onChange={handleFilterChange}
        />
      </div>
      <div className="movie-layout">
        <ul className="movie-list">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie: Movie, index: number) => (
              <MovieList
                key={movie.id}
                movie={movie}
                showMovieDetails={() => handleMovieSelection(index)}
              />
            ))
          ) : (
            <div className="no-movie">No Movie Found</div>
          )}
        </ul>

        {selectedMovieIndex === null ? (
          <div className="no-movie">No Movie Selected</div>
        ) : (
          <MovieDetails movie={filteredMovies[selectedMovieIndex]} img={imageList}/>
        )}
      </div>
    </StyledMovieLayout>
  )
}

export default MovieComponent
