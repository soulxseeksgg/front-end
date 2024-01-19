import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginResponse } from '../interfaces/i-login-response';
import { Observable } from 'rxjs';
import { IRegisterResponse } from '../interfaces/i-register-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string): Observable<ILoginResponse>{
    let url = "http://localhost:8080/user/login";
    let body = {
      email: email 
      ,password: password
    }
    return this.httpClient.post<ILoginResponse>(url,body);
  }

  register(email: string, username: string, password: string): Observable<IRegisterResponse>{
    let url = "http://localhost:8080/user/register";
    let body = {
      email: email
      ,userName: username
      ,password: password
    }
    return this.httpClient.post<IRegisterResponse>(url,body);
  }
}
