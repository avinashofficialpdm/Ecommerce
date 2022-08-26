import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CountService {

  public behaviourSubjectCart = new BehaviorSubject<number>(0)
  public behaviourSubjectWishlist = new BehaviorSubject<number>(0)

constructor() { }

  sendCartItems(data:any)
  {
    console.log(data);

    this.behaviourSubjectCart.next(data)
    
  }

  sendWishlistItems(data:any){
    console.log(data);
    
    this.behaviourSubjectWishlist.next(data)
  }

}
