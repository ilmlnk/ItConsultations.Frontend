import { Attachment } from "./attachment.model";

export interface Review {
  id: number;
  reviewConsId: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  rating: number;
  attachments: Attachment[];
}