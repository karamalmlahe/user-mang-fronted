import { CookiesService } from './../../services/cookie-service/cookies.service';
import { AccountService } from './../../services/account-services/account.service';
import { OrdersService } from 'src/services/order-services/orders.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css'],
})
export class AddOrderComponent implements OnInit {
  numberOfItems: number;
  numberOfItemsError: string = '';
  isFormOpen: boolean;
  userId: number;
  constructor(
    private router: Router,
    protected ordersService: OrdersService,
    private accountService: AccountService,
    private cookiesService: CookiesService
  ) {
    this.isFormOpen = false;
  }
  ngOnInit(): void {
    if (this.cookiesService.isUserIdExists()) {
      this.userId = this.cookiesService.getUserId();
      this.checkUserIfExists();
    } else {
      this.router.navigate([`/`]);
    }
  }
  get getPrice(): number {
    return this.numberOfItems
      ? this.ordersService.getPriceOfItems(this.numberOfItems)
      : 0;
  }
  addOrder() {
    this.numberOfItemsError = '';
    if (this.numberOfItems) {
      this.ordersService.addOrderByUserId(this.numberOfItems).subscribe(
        (res) => {
          this.router.navigate([`my/orders`]);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.numberOfItemsError = 'Number of Items is mandatory';
    }
  }
  checkUserIfExists() {
    this.accountService.getCurrentUser().subscribe(
      (res) => {},
      () => {
        this.cookiesService.deleteId();
        this.router.navigate([`/`]);
      }
    );
  }
}
