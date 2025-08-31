import { Coach } from "./coach";

export interface Consultation {
    id: number;
    consId: string;
    title: string;
    description: string;
    price: number;
    currency: string;
    thumbnailUrl: string;
    coachImageUrl: string;
    isFavorite: boolean;
    duration: number;
    coach: Coach;
}
