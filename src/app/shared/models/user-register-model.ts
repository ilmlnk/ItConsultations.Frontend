import { UserRole } from "../enums/user-role";

export interface UserRegisterModel {
    firebaseUid: string;
    consId: string;
    userId: number;
    firstName: string;
    lastName?: string;
    username: string;
    country: string;
    gender: string;
    email: string;
    password: string;
    birthDate?: Date;
    pictureUrl?: string;
    linkedInUrl?: string;
    gitHubUrl?: string;
    phoneNumber: string;
    role: UserRole;
}