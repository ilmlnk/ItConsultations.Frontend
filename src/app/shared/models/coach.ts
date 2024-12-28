import { Consultation } from "./consultation";
import { Language } from "../enums/language.enum";

export interface Coach {
    id: number;
    firstName: string;
    lastName: string;
    description: string;
    position: string;
    imageUrl: string;
    username: string;
    password: string;
    companyName: string;
    companyImageUrl?: string;
    email?: string;
    linkedInUrl?: string;
    telegramUrl?: string;
    videoCardUrl?: string;
    consultations?: Consultation[];
    languages: Language[];
}
