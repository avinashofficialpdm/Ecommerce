import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EcartService } from '../services/ecart.service';

@Injectable({
  providedIn: 'root'
})
export class HomeresGuard implements Resolve<any> {

  constructor(private serv:EcartService , private rout:Router){}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){

       return this.serv.getProduct()
  }
  
}
