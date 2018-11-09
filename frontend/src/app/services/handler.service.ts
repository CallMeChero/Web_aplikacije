import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HandlerService {

  constructor(private http: HttpClient) { }

  signUp(data) {
  	return this.http.post('http://localhost:8000/api/signup', data);
  }

  logIn(data) {
  	return this.http.post('http://localhost:8000/api/login', data);
  }

  passReset(email) {
  	return this.http.post('http://localhost:8000/api/request-reset', email);
  }

  changePass(email) {
    return this.http.post('http://localhost:8000/api/reset-rassword', email);
  }


}
