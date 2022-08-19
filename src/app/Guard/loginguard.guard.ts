import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginguardGuard implements CanActivate {

  constructor(private rout:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any {
    if(localStorage.getItem('token'))
    {
      return true
    }
    else
    {
      alert("Please Login")
      this.rout.navigateByUrl('login')
      return false
    }
  }
  
}
