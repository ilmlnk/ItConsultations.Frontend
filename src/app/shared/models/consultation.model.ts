import { Coach } from "./coach.model";

export interface Consultation {
    id: number;
    consId: string;
    title: string;
    description: string;
    price: number;
    currency: string;
    thumbnailUrl: string;
    isFavorite: boolean;
    duration: number;
    coach: Coach;
}
