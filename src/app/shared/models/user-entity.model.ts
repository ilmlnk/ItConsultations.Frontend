import { UserRole } from "../enums/user-role.enum";

export interface UserEntity {
    firebaseUid: string;
    consId: string;
    userId: number;
    firstName: string;
    lastName: string;
    birthDate: Date;
    email: string;
    username: string;
    password: string;
    photoUrl: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
    lastLoginAt: Date;
    linkedInUrl?: string;
    gitHubUrl?: string;
    phoneNumber: string;
}