import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginResponse } from '../interfaces/i-login-response';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient
  ) { }

  login(email: string, password: string): Observable<ILoginResponse>{

    let url = "http://localhost:8080/myApp/login";
    let body = {
      email: email
      ,password: password
    }
    return this.httpClient.post<ILoginResponse>(url,body);
  }
  
}
