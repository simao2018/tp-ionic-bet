import { Component, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { UserDto, UserService } from "../../../providers/api-client.generated";
import { GlobalService } from "../../../services/global.service";
import { DialogService } from "../../components/dialog/dialog.service";


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class LoginComponent {

    title = 'web-api'

    loginData: { username?: string; password?: string; } = {};
    userNotFound: boolean;
    loading: boolean = false;
    user: UserDto;
    constructor(
        private userService: UserService,
        private router: Router,
    ) {
        // console.log('login')
    }

    async testApi() {
        this.loading = true;
        this.userNotFound = false;
        const response = await this.userService.logUser({ getLoginRequest: { userName: this.loginData.username, password: this.loginData.password } }).toPromise();
        if (!response.succes) {
            this.loading = false;
            this.userNotFound = true;
            return;
        }


        this.user = response.user;
        console.log(`🚀 ~ this.user`, this.user);
        GlobalService.isConnected.next(true);
        GlobalService.userConnected.next(this.user);




        this.router.navigateByUrl('home');

        this.loading = false;

    }
}
