import { Observable } from 'rxjs';
import IAccount from 'src/interfaces/IAccount';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AccountService } from 'src/services/account-services/account.service';
import { Validation } from 'src/validations';
import { errors } from 'src/shared/errors';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  username?: AbstractControl;
  email?: AbstractControl;
  password?: AbstractControl;
  confirmPassword?: AbstractControl;
  submitted = false;
  constructor(
    protected accountService: AccountService,
    private router: Router
  ) {
    this.signupForm = new FormGroup({});
  }
  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      passwordGroup: new FormGroup(
        {
          password: new FormControl('', [
            Validators.required,
            Validators.minLength(4),
            Validation.containUpperCase,
            Validation.containLowerCase,
            Validation.containNumber,
            Validation.containCustomSymbols,
          ]),
          confirmPassword: new FormControl('', [Validators.required]),
        },
        [Validation.checkPasswordGroup]
      ),
    });
    this.username = this.signupForm.controls['username'];
    this.email = this.signupForm.controls['email'];
    let passwordGroup: FormGroup = this.signupForm.controls[
      'passwordGroup'
    ] as FormGroup;
    this.password = passwordGroup.controls['password'];
    this.confirmPassword = passwordGroup.controls['confirmPassword'];
  }

  onSubmit() {
    this.submitted = true;
    if (this.signupForm.valid) {
      const values = this.signupForm.value;
      this.accountService
        .updateAccount(
          values.email,
          values.username,
          values.passwordGroup.password
        )
        .subscribe((res) => {
          if (res.success) {
            this.router.navigate([`cust/${res.data.id}/orders`]);
          } else {
            if (res.message == 'the email is not exists') {
              this.email?.setErrors({ emailIsNotExists: true });
            } else if (res.message === 'the account is already updated') {
              this.email?.setErrors({ emailIsUpdated: true });
            } else if (res.message === 'This username is already exists') {
              this.username?.setErrors({ usernameIsExists: true });
            }
          }
        });
    }
  }
  get usernameError() {
    if (
      !this.username?.valid &&
      this.username &&
      (this.username?.touched || this.submitted)
    ) {
      if (this.username.errors?.['required'])
        return errors.required('Username');
      else if (this.username.errors?.['minlength'])
        return errors.minlength(
          'Username',
          this.username.errors?.['minlength'].requiredLength
        );
      else if (this.username.errors?.['usernameIsExists']) {
        return 'This username is exists';
      }
      return '';
    }

    return '';
  }
  get emailError() {
    if (
      !this.email?.valid &&
      this.email &&
      (this.email?.touched || this.submitted)
    ) {
      if (this.email.errors?.['required']) return errors.required('Email');
      else if (this.email.errors?.['email']) return errors.email();
      else if (this.email.errors?.['emailIsNotExists'])
        return 'This email is not exists';
        else if (this.email.errors?.['emailIsUpdated'])
        return 'the account is already updated';
      return '';
    }
    return '';
  }
  get passwordError() {
    if (
      !this.password?.valid &&
      this.password &&
      (this.password?.touched || this.submitted)
    ) {
      const passwordErrors = [];
      if (this.password.errors?.['required'])
        return [errors.required('Password')];
      if (this.password.errors?.['minlength']) {
        passwordErrors.push(
          errors.minlength(
            'Password',
            this.password.errors?.['minlength'].requiredLength
          )
        );
        // return errors.minlength(
        //   'Password',
        //   this.password.errors?.['minlength'].requiredLength
        // );
      }

      if (this.password.errors?.['containUpperCase']) {
        passwordErrors.push(errors.containUpperCase('Password'));
        // return errors.containUpperCase('Password');
      }
      if (this.password.errors?.['containLowerCase']) {
        passwordErrors.push(errors.containLowerCase('Password'));
        // return errors.containLowerCase('Password');
      }
      if (this.password.errors?.['containNumber']) {
        passwordErrors.push(errors.containNumber('Password'));
        // return errors.containNumber('Password');
      }
      if (this.password.errors?.['containCustomSymbols']) {
        passwordErrors.push(errors.containCustomSymbols('Password'));
        // return errors.containCustomSymbols('Password');
      }
      return passwordErrors;
    }
    return [''];
  }
  get passwordConfirmError() {
    if (
      this.confirmPassword &&
      (this.confirmPassword?.touched || this.submitted)
    ) {
      if (this.confirmPassword.errors?.['required'])
        return errors.required('Password');
      if (
        this.signupForm.controls['passwordGroup'].errors?.['PasswordsNotMatch']
      )
        return errors.PasswordsNotMatch();
    }

    return '';
  }
}
