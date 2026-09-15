export declare class CdnController {
    private readonly IMGBB_API_KEY;
    uploadFile(file: Express.Multer.File): Promise<{
        statusCode: number;
        message: string;
        data: {
            url: any;
            filename: string;
            mimetype: string;
            size: number;
        };
    }>;
}
