import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookiesService {
  constructor(private cookieService: CookieService) {}

  getUserId(): number {
    const id: string = this.cookieService.get('id');
    return parseInt(id);
  }
  getThemeColor(): string {
    const theme: string = this.cookieService.get('themeColor');
    return theme;
  }
  setUserId(id: string): void {
    const myDate: Date = new Date();
    myDate.setMinutes(myDate.getMinutes() + 2);
    this.cookieService.set('id', id, { expires: myDate, sameSite: 'Lax' });
  }
  setThemeColor(theme: string): void {
    this.cookieService.set('themeColor', theme);
  }
  deleteId(): void {
    this.cookieService.delete('id');
  }
  isUserIdExists(): boolean {
    return this.cookieService.check('id');
  }
  isThemeExists(): boolean {
    return this.cookieService.check('themeColor');
  }
}
