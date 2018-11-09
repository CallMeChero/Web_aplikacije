import { Component, OnInit } from '@angular/core';
import { HandlerService } from '../../services/handler.service';
import { JwtTokenService } from '../../services/jwt-token.service';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public error = [];

  public form = {
  	email: null,
  	name: null,
  	password: null,
  	password_confirmation: null
  };

  constructor(
    private handler:HandlerService,
    private token: JwtTokenService,
    private router: Router,
    private snotify: SnotifyService
    ) { }

  onSubmit() {
    this.snotify.info('Wait', {timeout: 3000})
    setTimeout(() =>{
      this.handler.signUp(this.form).subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error)
      );
    },3000)
  	
  }

  handleResponse(data) {
    this.token.handleToken(data.access_token);
    this.router.navigateByUrl('/profile');
    this.snotify.success('You have successfully signed in!');
  }

  handleError(error) {
    this.error = error.error.errors;
  }

  ngOnInit() {
  }

}
