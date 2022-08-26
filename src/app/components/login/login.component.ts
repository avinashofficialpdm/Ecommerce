import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EcartService } from 'src/app/services/ecart.service';
import { elementAt } from 'rxjs';
import { user } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loggedUsername: any

  // form control.....
  loginForm = this.fb.group({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })


  constructor(private rout: Router, private fb: FormBuilder, private serv: EcartService) { }

  ngOnInit() {
  }

  login() {
    this.serv.getUsers().subscribe((res: any) => {
      if (res.find((element: any) => element.username == this.loginForm.value.username)) {
        let currentUser = res.find((element:any) => element.username == this.loginForm.value.username)
        if (currentUser.password == this.loginForm.value.password) {
          this.loggedUsername = this.loginForm.value.username
          localStorage.setItem('token', this.loggedUsername)
          localStorage.setItem('id', currentUser.id)
          alert("Login Successful")
          this.rout.navigateByUrl('')
        }
        else {
          alert("Please check your Password")
        }
      }
      else {
        alert("No user found")
      }
    })
  }


}
