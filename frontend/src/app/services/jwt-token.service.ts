import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {

  private payloadIss = {
  	login: 'http://localhost:8000/api/login',
  	signup: 'http://localhost:8000/api/signup'
  }

  constructor() { }

  handleToken(token) {
  	this.setToken(token);
  }

  setToken(token) {
    //network storage
  	localStorage.setItem('token', token);
  }

  getToken() {
  	return localStorage.getItem('token');
  }

  removeToken() {
  	localStorage.removeItem('token');
  }

  checkValidation(){
  	const token = this.getToken();
  	if(token) {
  		const payload = this.getPayload(token);
  		if(payload) {
        // 1 od ruta se mora poklapati sa payloadom od jtw-a 
  			return Object.values(this.payloadIss).indexOf(payload.iss) ? true : false;
  		}
  	}
  	return false;
  }

  getPayload(token) {
  	//base64
  	const payload = token.split('.')[1];
  	return this.decodePayload(payload);
  }

  decodePayload(payload) {
    //string -> objekt
  	return JSON.parse(atob(payload));
  }

  loggedIn() {
  	return this.checkValidation();
  }

}
