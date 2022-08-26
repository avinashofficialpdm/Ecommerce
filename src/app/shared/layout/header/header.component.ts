import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CountService } from 'src/app/services/count.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedOut:boolean=true
  countofCart:any
  countofWishlist:any

  constructor(private behavserv:CountService){}

  ngOnInit() {

    if(localStorage.getItem('token')){
      this.loggedOut = false;
    }
    else{
      this.loggedOut=true
    }

    this.behavserv.behaviourSubjectCart.subscribe(number=>{this.countofCart=number})
    this.behavserv.behaviourSubjectWishlist.subscribe(number=>{this.countofWishlist=number})
  }

 
}
