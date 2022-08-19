import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehavioursubjectService } from 'src/app/services/behavioursubject.service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  wishlistProducts:any[]=[]
  currentUser:any
  wishlistItem:any

  constructor(private serv:ServiceService , private rout:Router,private behavserv:BehavioursubjectService) { }

  ngOnInit() {

  

    this.currentUser=localStorage.getItem('token')

    this.serv.getUsers().subscribe((ele:any)=>{
      this.currentUser = ele.find((element: any) => element.username == this.currentUser)

      this.wishlistProducts=this.currentUser.wishlist
      console.log(this.wishlistProducts);
      
    })

}


wishtocart(item:any)
{
  this.wishlistItem=item
  if(localStorage.getItem('token')){
    
    let productincart= this.currentUser.cart.find((ele:any)=>ele.id == this.wishlistItem.id)
    let wishproductindex = this.currentUser.wishlist.findIndex((ele:any)=>ele.id == this.wishlistItem.id)
    console.log(wishproductindex);
    
    if(productincart){
      alert("Item already exist on Cart")
    }
    else{
      this.wishlistItem.count = 1;
      this.wishlistItem.countprice = this.wishlistItem.price
      this.currentUser.cart.push(this.wishlistItem)
      this.currentUser.wishlist.splice(wishproductindex,1)
      alert("Item Successfully added to cart")
      // this.rout.navigateByUrl('cart')
      console.log(this.currentUser);
      this.serv.wishList( this.currentUser.id ,  this.currentUser) 
      this.behavserv.sendCartItems(this.currentUser.cart.length)

    }
    
  }
}

deletewishlist(id:any)
{
  
  this.serv.getUsers().subscribe((item:any)=>{
    let index = this.currentUser.wishlist.findIndex((ele:any)=>ele.id == id)
    this.currentUser.wishlist.splice(index,1)
    this.serv.deleteWishlistItem(this.currentUser.id,this.currentUser)
  })
}
}
