import { Component, OnInit } from '@angular/core';
import { UserService } from '../../providers/api-client.generated';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  login() {
    //const response = await this.userService
  }

}
