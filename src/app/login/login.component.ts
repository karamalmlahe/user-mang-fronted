import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/services/account-services/account.service';
import { errors } from 'src/shared/errors';
import { Validation } from 'src/validations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  username?: AbstractControl;
  password?: AbstractControl;
  submitted = false;
  constructor(
    protected accountService: AccountService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({});
  }
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
      ]),

      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validation.containUpperCase,
        Validation.containLowerCase,
        Validation.containNumber,
        Validation.containCustomSymbols,
      ]),
    });
    this.username = this.loginForm.controls['username'];
    this.password = this.loginForm.controls['password'];
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.accountService
        .login(this.username.value, this.password.value)
        .subscribe((res) => {
          if (res.success) {

            //cookie
            // this.router.navigate([`cust/${res.data.id}/orders`]);
            this.router.navigate([`/`]);
          } else {
            if (res.message == 'Your password is not match') {
              this.password?.setErrors({ passwordNotMatch: true });
            } else if (res.message == 'This username is not exists') {
              this.username?.setErrors({ usernameNotExists: true });
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
      else if (this.username.errors?.['usernameNotExists']) {
        return 'This username is not exists';
      }
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
      }
      if (this.password.errors?.['containUpperCase']) {
        passwordErrors.push(errors.containUpperCase('Password'));
      }
      if (this.password.errors?.['containLowerCase']) {
        passwordErrors.push(errors.containLowerCase('Password'));
      }
      if (this.password.errors?.['containNumber']) {
        passwordErrors.push(errors.containNumber('Password'));
      }
      if (this.password.errors?.['containCustomSymbols']) {
        passwordErrors.push(errors.containCustomSymbols('Password'));
      }
      if (this.password.errors?.['passwordNotMatch']) {
        passwordErrors.push('Your password is not match');
      }
      return passwordErrors;
    }
    return [''];
  }
}
