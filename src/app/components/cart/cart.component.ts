import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { products } from 'src/app/models/products';
import { user } from 'src/app/models/user';
import { userproduct } from 'src/app/models/userproduct';
import { CountService } from 'src/app/services/count.service';
import { EcartService } from 'src/app/services/ecart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartProducts: userproduct[] = []
  currentUser?: string | null
  currentUserDetails: user | undefined = new user()
  currentProductId?: userproduct = new userproduct()
  totalprice: number = 0



  constructor(private serv: EcartService, private rout: Router, private activrout: ActivatedRoute,
    private behavserv: CountService) { }

  ngOnInit() {
    // call behvr sbjct 
    this.currentUser = localStorage.getItem('token')
    this.serv.getUsers().subscribe((res: user[]) => {
      let Usr = res.find((element: user) => element.username == this.currentUser)
      this.behavserv.sendCartItems(Usr?.cart.length)
      // this.behavserv.sendWishlistItems(this.currentUserDetails.wishlist.length)

    })

    //view cart current user

    this.serv.getUsers().subscribe((item: user[]) => {
      this.currentUserDetails = item.find((element: user) => element.username == this.currentUser)
      if (this.currentUserDetails) {
        this.cartProducts = this.currentUserDetails.cart

        this.behavserv.sendWishlistItems(this.currentUserDetails.wishlist.length)
      }



      // total price
      // this.cartProducts.forEach((element) => {
      //   this.totalprice += element.price
      // })
      this.totalPrice()

    })

  }

  totalPrice() {
    this.cartProducts?.forEach((element) => {
      if (element.price) {
        this.totalprice += element.price
      }
    })
  }


  // quantity add
  quantity: number = 1
  i: number = 0

  plus(id: number | undefined) {

    this.serv.getUsers().subscribe((item: any) => {
      // find the currentproduct details
      this.currentProductId = this.currentUserDetails?.cart.find((element: any) => element.id == id)

      //  count & price increment
      if (this.currentProductId?.count && this.currentProductId.price) {
        this.currentProductId.count++
        this.currentProductId.countprice = this.currentProductId.price * this.currentProductId.count
        console.log(this.currentProductId.countprice);

        // total-added
        this.totalprice += this.currentProductId.price
      }

    })


  }
  minus(item: any) {

    item.count--
    let index = <number><any>this.cartProducts?.indexOf(item)
    console.log(this.cartProducts?.indexOf(item));
    this.totalprice -= item.price

    if (item.count < 1) {

      this.cartProducts?.splice(index, 1)
      console.log(item.id);

      if (this.currentUserDetails) {
        this.currentUserDetails.cart = this.cartProducts

      }
      this.serv.cartUpdate(this.currentUserDetails?.id, this.currentUserDetails)
      this.behavserv.sendCartItems(this.cartProducts?.length)

    }
    this.cartProducts[index].countprice = <number>this.cartProducts[index].price * <number>this.cartProducts[index].count

    this.serv.cartUpdate(this.currentUserDetails?.id, this.currentUserDetails)
    this.behavserv.sendCartItems(this.cartProducts?.length)


  }
  deleteItem(id: number | undefined) {
    this.serv.getUsers().subscribe((item: any) => {

      // findindex of productid in currentuser.cart
      let i: number | undefined = this.currentUserDetails?.cart.findIndex((item: any) => item.id == id)
      console.log(i);

      // delete using splice
      if (i != undefined) {
        this.currentUserDetails?.cart.splice(i, 1)
        this.serv.deleteCartItem(this.currentUserDetails?.id, this.currentUserDetails)
      }
      this.behavserv.sendCartItems(this.currentUserDetails?.cart.length)


      // update-total-price-when delete an item from cart
      this.totalprice = 0
      this.currentUserDetails?.cart.forEach((element: any) => {
        this.totalprice += element.price
      })

    })

  }

}
