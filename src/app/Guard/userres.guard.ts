import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EcartService } from '../services/ecart.service';

@Injectable({
  providedIn: 'root'
})
export class UserresGuard implements Resolve<any> {

  constructor(private serv:EcartService){}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

      return this.serv.getUsers()


  }
  
}
