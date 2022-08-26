import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { catchError, Observable, of, Subscription } from 'rxjs';
import { user } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class EcartService {
  url = "http://localhost:3000/users"

  constructor(private http: HttpClient) { }

  // product
  getProduct() {
    return this.http.get("http://localhost:3000/products")
  }

  // add cartProduct to cart
  cartUpdate(id: any, value: any) {
    console.log(id);
    console.log(value);
    return this.http.put(this.url + "/" + id, value)

      .pipe((catchError((error) => {
        alert('error noted')
        return error
      })))

      .subscribe({
        next() {
          console.log('success');
        },
        error() {
          console.log(Error);
        }
      })
  }

  // add product to wishlist
  wishList(id: any, value: any): void {
    console.log(value);

    this.http.put(this.url + "/" + id, value)

      .pipe((catchError((error) => {
        alert('error noted')
        return error
      })))

      .subscribe({
        next() {
          console.log('Success');

        },
        error() {
          console.log(Error);

        }
      })
  }

  // login
  getUsers(): Observable<user[]> {
    return this.http.get<user[]>(this.url)

  }
  // register
  registerUser(user: any): Observable<Object> {
    user.wishlist = []
    user.cart = []
    return this.http.post(this.url, user)
  }


  // delete cart item
  deleteCartItem(id: any, value: any): Subscription {
    return this.http.put(this.url + "/" + id, value).subscribe({
      next() {
        console.log('successfully deleted');

      },
      error() {
        console.log(Error);

      }
    })
  }

  deleteWishlistItem(id: any, value: any): Subscription {
    return this.http.put(this.url + "/" + id, value).subscribe({
      next() {
        console.log("successfully deleted wishlist");
      },
      error() {
        console.log(Error);

      }
    })
  }






}
