import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityAuthenticationGuard implements CanActivate {

  constructor(private _router : Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    var userLogin = localStorage.getItem("user");
    if(userLogin != null){
      return true;
    }else{
      alert("You cant Access this Page with out Login !..");
      this._router.navigate(["/home"]);
      return false;
    }
  }
  
}
