import { Component, OnInit } from '@angular/core';
import { HandlerService } from '../../../services/handler.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {

  public form = {
  	email: null
  }

  constructor(
  	private handler: HandlerService,
  	private snotify: SnotifyService,

  ) { }

  ngOnInit() {}

  onSubmit() {
    this.snotify.info('Wait', {timeout: 4000})
    setTimeout(() =>{
      this.handler.passReset(this.form).subscribe(
        data => this.handleResponse(data),
        error => this.snotify.error(error.error.error)
      )
    },3000)
  }

  handleResponse(response) {
    this.snotify.success('Reset password link has been successfully sent to your email adress');
  	this.form.email = null;

  }

}
