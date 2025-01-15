import type { Rating } from "../features/movies/Movie.types";

export const parseRating = (value: string): number | null => {
    if (value.includes('/')) {
        const [numerator, denominator] = value.split('/').map(Number);
        return (numerator / denominator) * 10; // Normalize to a scale of 10
    } else if (value.includes('%')) {
        return parseFloat(value) / 10; // Convert percentage to a scale of 10
    }
    return null;
};

export const calculateAverageRating = (ratings: Rating[]): number | null => {
    if (!ratings || ratings.length === 0) return null;

    const parsedRatings = ratings
        .map(rating => parseRating(rating.Value))
        .filter(rating => rating !== null) as number[];

    if (parsedRatings.length === 0) return null;

    const sum = parsedRatings.reduce((acc, rating) => acc + rating, 0);
    return Math.floor(sum / parsedRatings.length);
};

export function calculatePercentageRating(value: string): string {
  if (value.includes('/')) {
    const [numerator, denominator] = value.split('/').map(Number);
    return ((numerator / denominator) * 100).toFixed(0);
  } else if (value.includes('%')) {
    return parseFloat(value).toFixed(0);
  }
  return 'N/A';
}