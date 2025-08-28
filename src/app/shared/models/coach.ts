import { Consultation } from "./consultation";
import { Language } from "../enums/language.enum";
import { Review } from "./review";

export interface Coach {
    id: number;
    firstName: string;
    lastName: string;
    description: string;
    position: string;
    imageUrl: string;
    companyName: string;
    companyImageUrl?: string;
    email?: string;
    linkedInUrl?: string;
    telegramUrl?: string;
    videoCardUrl?: string;
    consultations?: Consultation[];
    reviews: Review[];
    topics: string[];
    skills: string[];
    languages: Language[];
}
