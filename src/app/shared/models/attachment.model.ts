export interface Attachment {
    id: number;
    entityId?: number;
    name: string;
    fileName: string;
    createdAt: Date;
    entityName: string;
    attachmentId: string;
    thumbnailId: number;
}