import type React from 'react';
import type { StarRatingProps } from '../movies/Movie.types';
import { StarContainer } from './StarRating.styles';

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {

  const emptyStars = 10 - rating;

  return (
    <StarContainer>
      {'★'.repeat(rating)}
      {'☆'.repeat(emptyStars)}
    </StarContainer>
  );
};

export default StarRating;
