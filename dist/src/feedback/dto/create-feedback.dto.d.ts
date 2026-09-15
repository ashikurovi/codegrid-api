import { FeedbackStatus } from '../entities/feedback.entity';
export declare class CreateFeedbackDto {
    userId?: number;
    name: string;
    image?: string;
    status?: FeedbackStatus;
}
