import { AccountService } from 'src/services/account-services/account.service';
import IAccount from 'src/interfaces/IAccount';
import { Component, OnInit } from '@angular/core';
import { CookiesService } from 'src/services/cookie-service/cookies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  protected themeColor: string;
  protected user: IAccount;
  constructor(
    private cookiesService: CookiesService,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    if (this.cookiesService.isThemeExists()) {
      this.themeColor = this.cookiesService.getThemeColor();
    }
    if (this.cookiesService.isUserIdExists()) {
      const id: number = this.cookiesService.getUserId();
      this.getUserById(id);
    }
  }
  saveThemeInCookie() {
    this.cookiesService.setThemeColor(this.themeColor);
  }
  getUserById(id: number) {
    this.accountService.getCurrentUser().subscribe((res) => {
      this.user = res.data;
    },()=>{
      // this.cookiesService.deleteId();
    });
  }
}
