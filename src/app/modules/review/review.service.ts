import { TReview } from './review.interface';
import { Review } from './review.model';

const createReviewIntoDB = async (payload: TReview) => {
  const newReview = await Review.create(payload);
  return newReview;
};


export const ReviewServices = {
  createReviewIntoDB,
};
