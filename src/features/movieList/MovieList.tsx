import type { Movie } from '../movies/Movie.types';
import StarRating from '../starRating/StarRating';
import { StyledMovieItem } from './MovieList.styles';

const MovieList = ({ movie, showMovieDetails }: { movie: Movie, showMovieDetails: () => void }) => (
  <StyledMovieItem key={movie.id} onClick={showMovieDetails}>
    <span>EPISODE {movie.id}</span>
    <span>{movie.episode}</span>
    <span><StarRating rating={movie.averageRating || 0} /></span>
    <span>{movie.releaseDate}</span>
  </StyledMovieItem>
);

export default MovieList;
