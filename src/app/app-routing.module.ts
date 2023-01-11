import { NotFoundComponent } from './not-found/not-found.component';
import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { OrdersUserComponent } from './orders-user/orders-user.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/signup', pathMatch: 'full' },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'cust/:id/orders',
    component: OrdersUserComponent,
  },
  {
    path: 'new-order/:id',
    component: AddOrderComponent,
  },
  {
    path:'not-found',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo:'not-found'

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
