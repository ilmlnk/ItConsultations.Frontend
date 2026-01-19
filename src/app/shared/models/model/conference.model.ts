import { Consultation } from "./consultation.model";
import { UserEntity } from "./user-entity.model";

export interface Conference {
    id: number;
    conferenceConsId: string;
    title: string;
    description?: string;
    startTime: Date;
    endTime?: Date;
    organizerId: number;
    organizer: UserEntity;
    consultation: Consultation;
    conferenceUrl: string;
}