import { DateTimeFormatPipe } from './../../pipes/date-time-format.pipe';
import { AccountService } from './../../services/account-services/account.service';
import { Component, OnInit } from '@angular/core';
import IOrder from 'src/interfaces/IOrder';
import { OrdersService } from 'src/services/order-services/orders.service';
import { Router } from '@angular/router';
import { CookiesService } from 'src/services/cookie-service/cookies.service';

@Component({
  selector: 'app-orders-user',
  templateUrl: './orders-user.component.html',
  styleUrls: ['./orders-user.component.css'],
  providers: [DateTimeFormatPipe],
})
export class OrdersUserComponent implements OnInit {
  userOrders: IOrder[] = [];
  search: string = '';
  filteredData: IOrder[];
  constructor(
    private router: Router,
    protected ordersService: OrdersService,
    protected accountService: AccountService
  ) {}
  ngOnInit(): void {
    this.InitUserOrders();
  }
  InitUserOrders() {
    this.ordersService.getCurrentUserOrders().subscribe(
      (res) => {
        this.userOrders = res.data;
        this.filterData();
      },
      () => {
        this.router.navigate(['/']);
      }
    );
  }

  filterData() {
    this.filteredData = this.userOrders.filter((order) =>
      Object.values(order).join(' ').includes(this.search)
    );
  }
  get totalPrice() {
    let sum = 0;
    this.filteredData?.map((order) => (sum += order.totalPrice));
    return sum.toFixed(2);
  }
  get totalItems() {
    let sum = 0;
    this.filteredData?.map((order) => (sum += order.numbersOfItems));
    return sum;
  }
}
