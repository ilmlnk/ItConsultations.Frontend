import { Consultation } from "./consultation.model";
import { Language } from "../enums/language.enum";
import { Review } from "./review";
import { CoachApplicationStatus } from "../enums/coach-application-status.enum";

export interface Coach {
    id: number;
    coachConsId: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    companyName: string;
    companyImageUrl?: string;
    username: string;
    description: string;
    email: string;
    companyPosition: string;
    pictureUrl: string;
    linkedInUrl?: string;
    gitHubUrl?: string;
    telegramUrl?: string;
    videoCardUrl?: string;
    coachApplicationStatus: CoachApplicationStatus; 
    consultations?: Consultation[];
    reviews?: Review[];
    topics: string[];
    skills: string[];
    languages: Language[];
}
