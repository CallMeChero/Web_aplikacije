import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { JwtTokenService } from '../../services/jwt-token.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  public loggedIn: boolean;

  public fullImgPath: string;

  constructor(
  	private auth: AuthenticationService,
  	private router: Router,
  	private token: JwtTokenService
  	) { }

  ngOnInit() {
  	this.auth.authStatus.subscribe(value => this.loggedIn = value);
    this.fullImgPath =  '/assets/img/slika.png';
  }

  logout(event: MouseEvent) {
  	event.preventDefault();
  	this.auth.changeAuthentication(false);
    this.router.navigateByUrl('/login');
    this.token.removeToken();

  }

}
