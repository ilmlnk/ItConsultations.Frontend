import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export class ConsultationsValidationHelper {
  public static passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup;

      if (!formGroup) {
        return null;
      }

      const passwordControl = formGroup.controls['password'];
      const confirmPasswordControl = formGroup.controls['confirmPassword'];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }
      if (confirmPasswordControl.pristine) {
        return null;
      }
      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ ...confirmPasswordControl.errors, invalid: true });
        return { invalid: true };
      } else {
        const errors = { ...confirmPasswordControl.errors };
        delete errors['invalid'];

        if (Object.keys(errors).length === 0) {
          confirmPasswordControl.setErrors(null);
        } else {
          confirmPasswordControl.setErrors(errors);
        }
        return null;
      }
    };
  }

  public static emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const valid = regex.test(control.value);
      return valid ? null : { invalid: true };
    };
  }

  public static passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
      const valid = regex.test(control.value);
      return valid ? null : { invalid: true };
    };
  }

  public static phoneNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
      const valid = regex.test(control.value);
      return valid ? null : { invalid: true };
    };
  }

  public static linkValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const regex = /^(https?:\/\/)?(localhost(:\d+)?(https?:\/\/)?(\/.*)?|(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z]{2,63}\/[-a-zA-Z0-9()@:%_\+.~#?&//=]+)$/;
      const valid = regex.test(control.value);
      return valid ? null : { invalid: true };
    };
  }

  public static usernameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const regex = /^[a-zA-Z0-9_]{3,16}$/;
      const valid = regex.test(control.value);
      return valid ? null : { invalid: true };
    };
  }
}
