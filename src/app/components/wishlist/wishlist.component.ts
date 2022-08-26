import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from 'src/app/models/user';
import { userproduct } from 'src/app/models/userproduct';
import { CountService } from 'src/app/services/count.service';
import { EcartService } from 'src/app/services/ecart.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  wishlistProducts:userproduct[]=[]
  currentUser?:string | null
  currentUserDetails:user=new user()
  wishlistItem:userproduct =new userproduct()

  constructor(private serv:EcartService , private rout:Router,private behavserv:CountService) { }

  ngOnInit() {

  

    this.currentUser=localStorage.getItem('token')

    this.serv.getUsers().subscribe((ele:any)=>{
      this.currentUserDetails = ele.find((element: any) => element.username == this.currentUser)

      this.wishlistProducts=this.currentUserDetails.wishlist
      console.log(this.wishlistProducts);
      this.behavserv.sendWishlistItems(this.currentUserDetails.wishlist.length)
      this.behavserv.sendCartItems(this.currentUserDetails.cart.length)


    })

}


wishtocart(item:any)
{
  this.wishlistItem=item
  if(localStorage.getItem('token')){
    
    let productincart= this.currentUserDetails.cart.find((ele:any)=>ele.id == this.wishlistItem.id)
    let wishproductindex = this.currentUserDetails.wishlist.findIndex((ele:any)=>ele.id == this.wishlistItem.id)
    console.log(wishproductindex);
    
    if(productincart){
      alert("Item already exist on Cart")
    }
    else{
    
      this.wishlistItem.count = 1;
      this.wishlistItem.countprice = this.wishlistItem.price
      this.currentUserDetails.cart.push(this.wishlistItem)
      this.currentUserDetails.wishlist.splice(wishproductindex,1)
      alert("Item Successfully added to cart")
      // this.rout.navigateByUrl('cart')
      console.log(this.currentUserDetails);
      this.serv.wishList( this.currentUserDetails.id ,  this.currentUserDetails) 
      this.behavserv.sendCartItems(this.currentUserDetails.cart.length)
      this.behavserv.sendWishlistItems(this.currentUserDetails.wishlist.length)


    }
    
  }
}

deletewishlist(id:any)
{
  
  this.serv.getUsers().subscribe((item:any)=>{
    let index = this.currentUserDetails.wishlist.findIndex((ele:any)=>ele.id == id)
    this.currentUserDetails.wishlist.splice(index,1)
    this.behavserv.sendWishlistItems(this.currentUserDetails.wishlist.length)
    this.serv.deleteWishlistItem(this.currentUserDetails.id,this.currentUserDetails)
  })
}
}
