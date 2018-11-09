import { Component, OnInit } from '@angular/core';
import { HandlerService } from '../../services/handler.service';
import { JwtTokenService } from '../../services/jwt-token.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public error = null;

  public form = {
  	email: null,
  	password: null
  };

  constructor(
    private handler:HandlerService,
    private token: JwtTokenService,
    private router: Router,
    private auth: AuthenticationService,
    private snotify: SnotifyService
  ) { }

  onSubmit() {
  	this.handler.logIn(this.form).subscribe(
  			data => this.responseData(data),
  			error => this.responseError(error)
  		);
  }

  responseData(data) {
    this.token.handleToken(data.access_token);
    this.auth.changeAuthentication(true);
    this.router.navigateByUrl('/profile');
    this.snotify.success('You have successfully signed in!');
  }

  responseError(error) {
    this.error = error.error.error;
  }

  ngOnInit() {
  }

}
