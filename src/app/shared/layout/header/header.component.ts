import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BehavioursubjectService } from 'src/app/services/behavioursubject.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedOut:boolean=false
  countofCart:any

  constructor(private behavserv:BehavioursubjectService){}

  ngOnInit() {

    if(localStorage.getItem('token')){
      this.loggedOut = true;
    }
    else{
      this.loggedOut=false
    }

    this.behavserv.behaviourSubjectCart.subscribe(number=>{this.countofCart=number})
  }

 
}
