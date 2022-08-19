import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { LoginguardGuard } from './Guard/loginguard.guard';

const routes: Routes = [
 {
   path:'login',
   component:LoginComponent
 },
 {
   path:"register",
   component:RegisterComponent
 },
 {
   path:'',
   component:HomepageComponent
 },
 {
   path:'cart',
   component:CartComponent,
   canActivate :[LoginguardGuard]
 },
 {
   path:'wishlist',
   component:WishlistComponent,
   canActivate:[LoginguardGuard]
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
