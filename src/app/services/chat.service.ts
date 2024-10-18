import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  postMessage(message: string): Observable<HttpResponse<any>>{
    let url = 'http://localhost:8080/chat/message';
    let body = {
      message: message
  }
  return this.http.post<HttpResponse<any>>(url,body);
  }  
}
