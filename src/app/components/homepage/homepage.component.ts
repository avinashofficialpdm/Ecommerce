import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehavioursubjectService } from 'src/app/services/behavioursubject.service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  productList: any[] = []
  loggedOut: boolean = false
  currentUser: any
  cartProduct: any
  wishlistProduct: any

  constructor(private serv: ServiceService, private rout: Router, private behavserv: BehavioursubjectService) { }

  ngOnInit() {
    this.serv.getProduct().subscribe((res: any) => {
      this.productList = res
      console.log(this.productList);
    })
    // logout button visible or not
    if (localStorage.getItem('token')) {
      this.loggedOut = true
    }
    // add to cart
    this.currentUser = localStorage.getItem('token')
    this.serv.getUsers().subscribe((res: any) => {
      this.currentUser = res.find((element: any) => element.username == this.currentUser)
     
      // behavior sbjct call
      this.behavserv.sendCartItems(this.currentUser.cart.length)
    })
  }
// Add to cart from homepage
  loggedIn(item: Object) {

    if (localStorage.getItem('token')) {
      this.cartProduct = item
    
// check if the product is already exist or not
      let cartindex = this.currentUser.cart.find((element: any) => element.id == this.cartProduct.id)
      if (cartindex) {
        alert("Item already exist..")
      }
      else {
        this.cartProduct.count = 1;
        this.cartProduct.countprice = this.cartProduct.price
        this.currentUser.cart.push(this.cartProduct)
        this.behavserv.sendCartItems(this.currentUser.cart.length)
      }
// add items to cart and update the cart
      this.serv.cartUpdate(localStorage.getItem('id'), this.currentUser)
      this.rout.navigateByUrl('cart')
      return true
    }
    else {
      alert('please login');
      this.rout.navigateByUrl('login')
      return false
    }
  }

// add to wishlist from homepage
  logWishlist(item: any) {
    console.log(item);
    if (localStorage.getItem('token')) {
      this.serv.wishList(localStorage.getItem('id'), this.currentUser)
      this.wishlistProduct = item

      let proexist = this.currentUser.wishlist.find((ele: any) => ele.id == this.wishlistProduct.id)
      console.log(proexist);
      if (proexist) {
        alert("Item already exist..");
      }
      else {
        this.wishlistProduct.count = 1;
        this.wishlistProduct.countprice = this.wishlistProduct.price
        this.currentUser.wishlist.push(this.wishlistProduct)
        alert("Item successfully added")
      }
      console.log(this.wishlistProduct);

      this.serv.wishList(localStorage.getItem('id'), this.currentUser)
      // this.rout.navigateByUrl('wishlist')
      return true
    }
    else {
      alert("Please Login....")
      this.rout.navigateByUrl('login')
      return false
    }

  }


  logout() {
    localStorage.removeItem('token')
    this.rout.navigateByUrl('home')
    window.location.reload()
  }

}
