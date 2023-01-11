import { AbstractControl, ValidationErrors } from '@angular/forms';

export class Validation {
  public static checkPasswordGroup(
    control: AbstractControl
  ): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) return { PasswordsNotMatch: true };
    return null;
  }
  public static containUpperCase(
    control: AbstractControl
  ): ValidationErrors | null {
    if (!/[A-Z]/.test(control.value)) return { containUpperCase: true };
    return null;
  }
  public static containLowerCase(
    control: AbstractControl
  ): ValidationErrors | null {
    if (!/[a-z]/.test(control.value)) return { containLowerCase: true };
    return null;
  }
  public static containNumber(
    control: AbstractControl
  ): ValidationErrors | null {
    if (!/\d/.test(control.value)) return { containNumber: true };
    return null;
  }
  public static containCustomSymbols(
    control: AbstractControl
  ): ValidationErrors | null {
    if (!/[-!@]/.test(control.value)) return { containCustomSymbols: true };
    return null;
  }
}
