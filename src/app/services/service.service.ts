import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Observable, Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {


  constructor(private http:HttpClient) { }

// product
  getProduct()
  {
    return this.http.get("http://localhost:3000/products")
  }
 
  // add cartProduct to cart
  cartUpdate(id:any,value:any)
  {
    console.log(id);
    console.log(value);
    return this.http.put("http://localhost:3000/users/"+id,value).subscribe({
      next(){
        console.log('success'); 
      },
      error(){
        console.log(Error);  
      }
    })
  }

// add product to wishlist
  wishList(id:any,value:any):void
  {
    console.log(value);
    
    this.http.put("http://localhost:3000/users/"+id,value).subscribe({
      next(){
        console.log('Success');
        
      },
      error(){
        console.log(Error);
        
      }
    })
  }

// login
  getUsers():Observable<Object>
  {
    return this.http.get("http://localhost:3000/users")
  }
// register
  registerUser(user:any):Observable<Object>
  {
    user.wishlist=[]
    user.cart=[]
    return this.http.post("http://localhost:3000/users",user)
  }


  // delete cart item
 deleteCartItem(id:any,value:any):Subscription
 {
   return this.http.put("http://localhost:3000/users/"+id,value).subscribe({
     next(){
       console.log('successfully deleted');
       
     },
     error(){
       console.log(Error);
       
     }
   })
 }

 deleteWishlistItem(id:any,value:any):Subscription
 {
    return this.http.put("http://localhost:3000/users/"+id,value).subscribe({
      next(){
        console.log("successfully deleted wishlist"); 
      },
      error(){
        console.log(Error);
        
      }
    })
 }






}
