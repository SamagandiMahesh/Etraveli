
// Define interfaces for state and movie data
export type MovieLayoutState  = {
    movieList: Movie[];
    isLoading: boolean;
    isImgLoading: boolean;
    error: string | null;
    imgError: string | null;
    filterText: '';
    sortCriteria: 'Episode';
    imageList: Record<string, string>;
}

export type Movie = {
    id: number;
    episode?: string;
    title: string;
    summary: string;
    director: string;
    releaseDate: string
    releaseYear: number;
    ratings?: Rating[];
    averageRating?: number;
    imdbId?: number
}

export type Rating = {
    Source: string;
    Value: string;
}

export type MovieResponse  ={
    title: string;
    episode_id: number;
    director: string;
    release_date: string;
    opening_crawl: string;
}

export type StarRatingProps =  {
  rating: number;
}
