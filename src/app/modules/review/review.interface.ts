import { Types } from "mongoose"

export type TReview = {
    userId: string | Types.ObjectId;
    rating: number;
    comment: string;
    reviewFor: string;
}