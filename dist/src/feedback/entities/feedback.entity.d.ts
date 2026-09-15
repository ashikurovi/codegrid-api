import { User } from '../../users/entities/user.entity';
export declare enum FeedbackStatus {
    ACTIVE = "Active",
    INACTIVE = "Inactive"
}
export declare class Feedback {
    id: number;
    user: User;
    name: string;
    image: string;
    status: FeedbackStatus;
    createdAt: Date;
    updatedAt: Date;
}
