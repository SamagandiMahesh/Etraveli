import type React from 'react';
import StarRating from '../starRating/StarRating';
import type { Movie } from '../movies/Movie.types';
import { StyledImage, StyledRatingItem, StyledRatingList, StyledSection } from './MovieDetails.styles';
import { calculatePercentageRating } from '../../utils/utils';

const MovieDetails: React.FC<{ movie: Movie, img: Record<string, string > }> = ({ movie, img }) => {
  const defaultImageUrl = "https://placehold.co/150x200";
  const imageUrl = movie.imdbId && img[movie.imdbId]
    ? img[movie.imdbId]
    : defaultImageUrl;
    
  return (
    <StyledSection className="movie-details">
      <h2>{movie?.episode ? `Episode ${movie?.episode}` : movie?.title}</h2>
      <div className="movie-details__content">
        <StyledImage src={imageUrl} alt="Movie Poster" />
        <p>{movie?.summary}</p>
      </div>
      <div>Directed By: {movie?.director}</div>
      <div>Average Rating: <StarRating rating={movie?.averageRating || 0} /></div>
      {movie?.ratings && (
        <StyledRatingList>
          {movie?.ratings.map((rating, index) => (
            <StyledRatingItem key={index}>
              {rating.Source}: {calculatePercentageRating(rating.Value)}%
            </StyledRatingItem>
          ))}
        </StyledRatingList>
      )}
    </StyledSection>
  );
};

export default MovieDetails;
