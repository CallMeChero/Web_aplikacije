import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { LoggedService } from './services/logged.service';
import { NotLoggedService } from './services/not-logged.service';

const routes : Routes = [
	{ path: 'login', component: LoginComponent, canActivate: [NotLoggedService]  },
	{ path: 'profile', component: ProfileComponent },
	{ path: 'request-reset', component: RequestResetComponent, canActivate: [NotLoggedService] },
	{ path: 'response-reset', component: ResponseResetComponent, canActivate: [NotLoggedService] },
	{ path: 'signup', component: SignupComponent, canActivate: [NotLoggedService] }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
