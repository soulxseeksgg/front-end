import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Route, RouterStateSnapshot } from '@angular/router';
import { AppCookieService } from './app-cookie.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(
    private appCookieService: AppCookieService
    ,private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
   
    if(this.appCookieService.hasAccessToken()){
        return true;
    }

    this.router.navigate(['/login']);
     return false;
  }
}
