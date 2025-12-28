import { UserRole } from "../../enums/user-role.enum";

export interface UserProfileResponse {
    uid: string;
    email: string;
    role: UserRole;

    firstName: string;
    lastName: string;
    displayName: string;
    photoUrl?: string;

    emailVerified: boolean;

    createdAt: Date;
    lastLoginAt?: Date;
}