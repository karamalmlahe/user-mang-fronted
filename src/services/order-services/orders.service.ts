import { Injectable } from '@angular/core';
import IOrder from 'src/interfaces/IOrder';
import data from './../../assets/data/data.json';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  orders: IOrder[] = [];
  items: number[] = [];
  pricePerUnit: number;

  constructor(private http: HttpClient) {
    this.orders = data.orders;
    this.items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    this.pricePerUnit = 2.78;
  }
  getCurrentUserOrders(): Observable<any> {
    return this.http.get(`http://localhost:8080/api/users/currentUser/orders`);
  }
  addOrderByUserId(userId: number, numberOfItems: number): Observable<any> {
    return this.http.post(
      `http://localhost:8080/api/orders/add?userId=${userId}`,
      {
        // params: {
        //   userId: userId,
        // },
        numbersOfItems: numberOfItems * 1,
        totalPrice: this.getPriceOfItems(numberOfItems),
      }
    );
  }
  getItems() {
    return this.items;
  }
  getPriceOfItems(numberOfItems: number) {
    return numberOfItems * this.pricePerUnit;
  }
}
