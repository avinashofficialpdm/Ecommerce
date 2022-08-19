import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BehavioursubjectService {

  public behaviourSubjectCart = new BehaviorSubject<number>(0)

constructor() { }

  sendCartItems(data:any)
  {
    console.log(data);

    this.behaviourSubjectCart.next(data)
    
  }

}
