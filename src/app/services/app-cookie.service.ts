import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AppCookieService {

  constructor(private cookieSerive: CookieService) { }

  setAccessToken(token:string) : void {
    this.cookieSerive.set('ACCESS_TOKEN',token);
  }

  getAccessToken() : string {
    return this.cookieSerive.get('ACCESS_TOKEN');
  }

  deleteAccessToken(): void{
    this.cookieSerive.delete('ACCESS_TOKEN');
  }

  hasAccessToken() : boolean {
    return this.cookieSerive.check('ACCESS_TOKEN');
  }
}
