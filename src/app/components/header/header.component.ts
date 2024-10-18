import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AppCookieService } from '../../services/app-cookie.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

    constructor(
      private router: Router
      ,private appCookieService: AppCookieService
    ){

    }

    doLogout(){
        this.appCookieService.deleteAccessToken();
        this.router.navigate(['/login']);
    }
}
