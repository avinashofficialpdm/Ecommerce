import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehavioursubjectService } from 'src/app/services/behavioursubject.service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartProducts: any[] = []
  currentUser: any
  cartUser: any[] = []
  currentProductId: any
  totalprice: number = 0



  constructor(private serv: ServiceService, private rout: Router, private activrout: ActivatedRoute, private behavserv: BehavioursubjectService) { }

  ngOnInit() {
    // call behvr sbjct 
    this.currentUser = localStorage.getItem('token')
    this.serv.getUsers().subscribe((res: any) => {
      let Usr = res.find((element: any) => element.username == this.currentUser)
      this.behavserv.sendCartItems(Usr.cart.length)

    })

    //view cart current user
    this.currentUser = localStorage.getItem('token')

    this.serv.getUsers().subscribe((item: any) => {
      this.currentUser = item.find((element: any) => element.username == this.currentUser)
      this.cartProducts = this.currentUser.cart

      // total price
      // this.cartProducts.forEach((element) => {
      //   this.totalprice += element.price
      // })
      this.totalPrice()
      console.log(this.totalprice);

    })

  }

  totalPrice() {
    this.cartProducts.forEach((element) => {
      this.totalprice += element.price
    })
  }


  // quantity add
  quantity: number = 1
  i: number = 0

  plus(id: number) {

    this.serv.getUsers().subscribe((item: any) => {
      // find the currentproduct details
      this.currentProductId = this.currentUser.cart.find((element: any) => element.id == id)

      //  count & price increment
      this.currentProductId.count++
      this.currentProductId.countprice = this.currentProductId.price * this.currentProductId.count
      console.log(this.currentProductId.countprice);

      // total-added
      this.totalprice += this.currentProductId.price
    })


  }
  minus(id: any) {

    if (this.currentProductId.count <= 1) {

      let cartproductindex = this.currentUser.cart.findIndex((ele: any) => ele.id == id)
      console.log(cartproductindex);
      this.currentUser.cart.splice(cartproductindex, 1)
      this.serv.cartUpdate(this.currentUser.id, this.currentUser)
      this.behavserv.sendCartItems(this.currentUser.cart.length)

      this.totalprice -= this.currentProductId.price

    }
    else {
      this.currentProductId = this.currentUser.cart.find((element: any) => element.id == id)
      this.currentProductId.count--;
      this.currentProductId.countprice = this.currentProductId.price * this.currentProductId.count
      console.log(this.currentProductId.countprice);

      // total-minus
      this.totalprice -= this.currentProductId.price
    }

  }
  deleteItem(id: any) {
    this.serv.getUsers().subscribe((item: any) => {

      // findindex of productid in currentuser.cart
      let i = this.currentUser.cart.findIndex((item: any) => item.id == id)
      console.log(i);

      // delete using splice
      this.currentUser.cart.splice(i, 1)
      this.serv.deleteCartItem(this.currentUser.id, this.currentUser)
      this.behavserv.sendCartItems(this.currentUser.cart.length)

      // update-total-price-when delete an item from cart
      this.totalprice = 0
      this.currentUser.cart.forEach((element: any) => {
        this.totalprice += element.price
      })

    })

  }

}
