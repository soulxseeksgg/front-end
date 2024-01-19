import { Component } from '@angular/core';
import { AppCookieService } from '../../services/app-cookie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(
    private appCookieService: AppCookieService
    ,private router: Router
  ){}

  doLogout(){
    this.appCookieService.deleteAccessToken();
    this.router.navigate(['/login']);
  }
}
