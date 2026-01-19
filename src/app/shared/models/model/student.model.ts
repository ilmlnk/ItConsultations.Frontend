import { Consultation } from "./consultation.model";

export interface Student {
    id: number;
    studentConsId: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    email: string;
    pictureUrl: string;
    githubUrl?: string;
    linkedInUrl?: string;
    consultation: Consultation;
}
