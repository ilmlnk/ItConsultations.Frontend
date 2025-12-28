import { EventStatus } from "../enums/event-status.enum";
import { RecurrenceType } from "../enums/recurrence.enum";
import { Conference } from "./conference.model";
import { EventParticipant } from "./event-participant.model";
import { UserEntity } from "./user-entity.model";

export interface Event {
    id: number;
    eventConsId: string;
    title: string;
    description?: string;
    location?: string;
    conference?: Conference;
    meetingProvider?: string;
    assigneeEmails: string[];
    participants: EventParticipant[];
    creator: UserEntity;
    startDateTime: Date;
    endDateTime: Date;
    reminderTime?: Date;
    reminderMinutes?: number;
    recurrenceType: RecurrenceType;
    recurrenceInterval?: number;
    recurrenceDayOfWeek?: object;
    recurrenceDayOfMonth?: number;
    recurrenceEndDate?: Date;
    recurrenceCount?: number;
    status: EventStatus;
    
}