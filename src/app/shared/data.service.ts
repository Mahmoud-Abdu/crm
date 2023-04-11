import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  fetchData (): Observable<any> {
     return this.http.get('https://my-json-server.typicode.com/mabukoush1/contacts/db');
  }
}
