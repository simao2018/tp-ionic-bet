import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../../global/auth.service';
import { BasePage } from '../../global/base.page';
import { UserService } from '../../providers/api-client.generated';

export interface LoginModel {
  email?: string;
  password?: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage extends BasePage implements OnInit {

  loginModel: LoginModel;
  loginError: string;

  constructor(
    private userService: UserService,
    private router: Router,
  ) {
    super();
  }

  ngOnInit() {
    this.loginModel = {};
    if (this.AuthUserSubject.getValue()) {
      this.router.navigate(['/home']);

    }
  }

  async login() {
    if (!this.isFieldCorrect())
      return;

    const loginResponse = await this.userService.logUser({ getLoginRequest: { email: this.loginModel.email, password: this.loginModel.password } }).toPromise();
    if (!loginResponse.success) {
      this.loginError = loginResponse.message;
      return;
    }

    AuthService.currentUser = loginResponse.user;
    AuthService.isConnected = true;
    this.AuthUserSubject.next(loginResponse.user);
    this.isConnectedSubject.next(true);
    localStorage.setItem('access_token', loginResponse.user.access_token);
    //window.location.assign('/home')
    this.router.navigate(['/home']);
  }

  isFieldCorrect() {
    return (this.loginModel?.email && this.loginModel?.password) ? true : false;
  }

}
