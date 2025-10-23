import { FormGroup } from "@angular/forms";
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

    public static mapRegistrationData(formData: FormGroup, ...additionalData: any) {
        return <UserRegisterModel>{
            email: formData.get('email')?.value,
            password: formData.get('password')?.value,
            firstName: formData.get('firstName')?.value,
            lastName: formData.get('lastName')?.value,
            role: formData.get('role')?.value,
            birthDate: formData.get('birthDate')?.value,
            country: formData.get('country')?.value,
            gender: formData.get('gender')?.value,
            username: formData.get('username')?.value
        };
    }
}