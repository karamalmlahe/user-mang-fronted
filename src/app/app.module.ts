import { OrdersService } from './../services/order-services/orders.service';
import { AccountService } from './../services/account-services/account.service';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HaederComponent } from './haeder/haeder.component';
import { SignupComponent } from './signup/signup.component';
import { OrdersUserComponent } from './orders-user/orders-user.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CookieService } from 'ngx-cookie-service';
@NgModule({
  declarations: [
    AppComponent,
    HaederComponent,
    SignupComponent,
    OrdersUserComponent,
    AddOrderComponent,
    NotFoundComponent,
    LoginComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [AccountService, OrdersService, CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
