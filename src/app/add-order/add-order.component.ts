import { OrdersService } from 'src/services/order-services/orders.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
    private route: ActivatedRoute,
    private router: Router,
    protected ordersService: OrdersService
  ) {
    this.isFormOpen = false;
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
  }
  ngOnInit(): void {}
  get getPrice(): number {
    return this.numberOfItems
      ? this.ordersService.getPriceOfItems(this.numberOfItems)
      : 0;
  }
  addOrder() {
    this.numberOfItemsError = '';
    if (this.numberOfItems) {
      this.ordersService
        .addOrderByUserId(this.userId, this.numberOfItems)
        .subscribe(
          (res) => {
            this.router.navigate([`cust/${this.userId}/orders`]);
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      this.numberOfItemsError = 'Number of Items is mandatory';
    }
  }
}
