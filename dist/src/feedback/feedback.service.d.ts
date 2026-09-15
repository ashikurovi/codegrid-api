import { Repository } from 'typeorm';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { Feedback } from './entities/feedback.entity';
export declare class FeedbackService {
    private readonly feedbackRepository;
    constructor(feedbackRepository: Repository<Feedback>);
    create(createFeedbackDto: CreateFeedbackDto): Promise<Feedback>;
    findAll(): Promise<Feedback[]>;
    findOne(id: number): Promise<Feedback>;
    update(id: number, updateFeedbackDto: UpdateFeedbackDto): Promise<Feedback>;
    remove(id: number): Promise<void>;
}
