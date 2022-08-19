import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  imageUrl:any

  get validate()
  {
    return this.registrationForm.controls
  }

  registrationForm = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.pattern('^[A-Za-z ]*$')]),
    username : new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z0-9]*$'),Validators.minLength(4)]),
    password : new FormControl('',[Validators.required]),
    image:new FormControl('')
  })

  constructor(private serv:ServiceService,private rout:Router) { }

  ngOnInit() {
  }

  onSelectfile(event:any)
  {
    if(event.target.files){
      let reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (event:any)=>{
        this.imageUrl = event.target.result
      }
    }
  }

  register()
  {
    this.registrationForm.value.image = this.imageUrl
    console.log(this.registrationForm.value);
    this.serv.registerUser(this.registrationForm.value).subscribe(item=>{
      alert("Register Successfully")
      this.rout.navigateByUrl('login')
    })
  }
}
