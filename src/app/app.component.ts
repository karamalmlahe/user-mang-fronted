import { OrdersService } from 'src/services/order-services/orders.service';
import { AccountService } from 'src/services/account-services/account.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'restore-login-data';
  constructor(protected accountService: AccountService,protected ordersService:OrdersService) {}
}
