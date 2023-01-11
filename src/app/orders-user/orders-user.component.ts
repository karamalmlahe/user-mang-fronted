import { DateTimeFormatPipe } from './../../pipes/date-time-format.pipe';
import { AccountService } from './../../services/account-services/account.service';
import { Component, OnInit } from '@angular/core';
import IOrder from 'src/interfaces/IOrder';
import { OrdersService } from 'src/services/order-services/orders.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  userId: number;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    protected ordersService: OrdersService,
    protected accountService: AccountService
  ) {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
  }
  ngOnInit(): void {
    this.InitUserOrders();
  }
  InitUserOrders() {
    this.ordersService.getOrdersByUserId(this.userId).subscribe(
      (res) => {
        this.userOrders = res.data;
        this.filterData();
      },
      () => {
        this.router.navigate(['not-found']);
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
