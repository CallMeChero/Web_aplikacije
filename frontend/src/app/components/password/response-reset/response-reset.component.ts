import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HandlerService } from '../../../services/handler.service';
import { Router } from '@angular/router';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {

  public form = {
  	email: null,
  	password: null,
  	password_confirmation: null,
  	resetToken: null
  }

  public error = [];

  constructor(
  	private router: ActivatedRoute,
  	private handler: HandlerService,
  	private route: Router,
  	private snotify: SnotifyService
  ) { 
  	router.queryParams.subscribe(params => {
  		this.form.resetToken = params['token']
  	})
  }

  onSubmit() {
  	this.handler.changePass(this.form).subscribe(
  		data => this.response(data),
  		error => this.responseErrors(error)
  	)
  }

  response(data){
  	let router = this.route
  	this.snotify.confirm('Now you can log in with new password!', {
  		buttons: [
  			{
  				text: 'Okay', 
  				action: toster => {
  					router.navigateByUrl('/login'),
  					this.snotify.remove(toster.id)
  				}
  			}
  		]
  	});
  }

  responseErrors(error) {
  	this.error = error.error.errors;
  }
  ngOnInit() {
  }

}
