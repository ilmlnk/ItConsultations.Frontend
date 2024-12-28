import { Coach } from "./coach";

export interface Consultation {
    id: number;
    title: string;
    description: string;
    price: number;
    thumbnailUrl: string;
    coachImageUrl: string;
    duration: number;
    coach: Coach;
}
