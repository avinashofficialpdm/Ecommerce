import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { user } from 'src/app/models/user';
import { userproduct } from 'src/app/models/userproduct';
import { CountService } from 'src/app/services/count.service';
import { EcartService } from 'src/app/services/ecart.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  productList: any[] = []
  loggedOut: boolean = false
  currentUser: string | null =''
  currentUserDetails: user =new user()
  cartProduct?: userproduct
  wishlistProduct: userproduct | undefined

  constructor(private serv:EcartService, private rout: Router, private behavserv: CountService,
    private activ: ActivatedRoute) { }

  ngOnInit() {

    // from resolve
    this.productList = this.activ.snapshot.data['product']

    // logout button visible or not
    if (localStorage.getItem('token')) {
      this.loggedOut = true
    }
    // add to cart
    this.currentUser = localStorage.getItem('token')
    // resolve
    let allUserDetails = this.activ.snapshot.data['userdetails']
    this.currentUserDetails = allUserDetails.find((element: user) => element.username == this.currentUser)
    
    this.behavserv.sendCartItems(this.currentUserDetails.cart.length)
    this.behavserv.sendWishlistItems(this.currentUserDetails.wishlist.length)
  }

  // Add to cart from homepage
  loggedIn(item: userproduct) {

    if (localStorage.getItem('token')) {
      this.cartProduct = item

      // check if the product is already exist or not
      let cartindex = this.currentUserDetails.cart.find((element: userproduct) => element.id == this.cartProduct?.id)
      if (cartindex) {
        alert("Item already exist..")
      }
      else {
        this.cartProduct.count = 1;
        this.cartProduct.countprice = this.cartProduct.price
        this.currentUserDetails.cart.push(this.cartProduct)
        this.behavserv.sendCartItems(this.currentUserDetails.cart.length)
      }
      // add items to cart and update the cart
      this.serv.cartUpdate(localStorage.getItem('id'), this.currentUserDetails)
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
  logWishlist(item: userproduct) {
    console.log(item);
    if (localStorage.getItem('token')) {
      this.serv.wishList(localStorage.getItem('id'), this.currentUserDetails)
      this.wishlistProduct = item

      let proexist = this.currentUserDetails.wishlist.find((ele: userproduct) => ele.id == this.wishlistProduct?.id)
      console.log(proexist);
      if (proexist) {
        alert("Item already exist..");
      }
      else {
        if(this.wishlistProduct){
          this.wishlistProduct.count = 1;
          this.wishlistProduct.countprice = this.wishlistProduct.price
          this.currentUserDetails.wishlist.push(this.wishlistProduct)
  
          this.behavserv.sendWishlistItems(this.currentUserDetails.wishlist.length)
          alert("Item successfully added")
        }
       
      }
      console.log(this.wishlistProduct);

      this.serv.wishList(localStorage.getItem('id'), this.currentUserDetails)
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
    location.replace('')
  }

}
