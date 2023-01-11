import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}
  updateAccount(
    email: string,
    username: string,
    password: string
  ): Observable<any> {
    return this.http.patch('http://localhost:8080/api/users', {
      email: email,
      username: username,
      password: password,
    });
  }

}

// let account = this.getAccountByEmail(email);
// if (account && !account.username && !account.password) {
//   if (!this.getAccountByUsername(username)) {
//     account.username = username;
//     account.password = password;
//     return { status: true, userId: account.id };
//   } else {
//     return { status: false, message: 'This username is exists' };
//   }
// }
// return { status: false, message: 'This email is not exists' };

// public getAccountById(id: number): IAccount | null {
//   const account = this.accounts.find((account) => account.id == id);
//   if (account) {
//     return account;
//   } else {
//     return null;
//   }
// }
// public getAccountByUsername(username: string): IAccount | null {
//   const account = this.accounts.find(
//     (account) => account.username == username
//   );

//   if (account) {
//     return account;
//   } else {
//     return null;
//   }
// }
// public getAccountByEmail(email: string): IAccount | null {
//   const account = this.accounts.find((account) => account.email == email);
//   if (account) {
//     return account;
//   } else {
//     return null;
//   }
// }
