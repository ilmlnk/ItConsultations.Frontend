import { UserRegisterModel } from "../models/user-register-model";

export class ConsultationsMapper {
    public static mapUserRegistrationModel(formData: UserRegisterModel, ...additionalData: any) {
        return <UserRegisterModel>{
            firebaseUid: additionalData.user.uid,
            consId: formData.consId,
            userId: formData.userId,
            firstName: formData.firstName,
            lastName: formData.lastName,
            username: formData.username,
            email: additionalData.user.email,
            password: formData.password,
            birthDate: formData.birthDate,
            pictureUrl: formData.pictureUrl,
            linkedInUrl: formData.linkedInUrl,
            gitHubUrl: formData.gitHubUrl,
            phoneNumber: formData.phoneNumber,
            role: formData.role
        };
    }
}