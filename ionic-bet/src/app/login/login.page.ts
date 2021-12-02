import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../../global/auth.service';
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
export class LoginPage implements OnInit {

  loginModel: LoginModel;
  loginError: string;

  constructor(
    private userService: UserService,
    public authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loginModel = {};
    if (this.authService.AuthUserSubject.getValue()) {
      this.router.navigate(['/home']);

    }
  }

  async login() {
    this.authService.LoadingMode()
    if (!this.isFieldCorrect())
      return;

    const loginResponse = await this.userService.logUser({ getLoginRequest: { email: this.loginModel.email, password: this.loginModel.password } }).toPromise();
    console.log("🚀 ~ login ~ loginResponse", loginResponse);
    if (!loginResponse.success) {
      this.loginError = loginResponse.message;
      return;
    }

    this.authService.AuthUserSubject.next(loginResponse.user);
    localStorage.setItem('access_token', loginResponse.user.access_token);
    this.router.navigate(['/home']);
  }

  isFieldCorrect() {
    return (this.loginModel?.email && this.loginModel?.password) ? true : false;
  }

}
