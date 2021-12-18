import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "../auth.service";
import jwt_decode from "jwt-decode";
import { UserDto } from "../../providers/api-client.generated";


@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    constructor(
        private _router: Router,
    ) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        this.refreshAuthTokenAccess();
        if (!AuthService.isConnected) {
            this._router.navigate(['/login']);
            return false;
        }
        return true;
    }

    private refreshAuthTokenAccess() {
        const access_token = localStorage.getItem('access_token');
        if (access_token) {
            AuthService.isConnected = true;
            AuthService.currentUser = jwt_decode(access_token) as UserDto;
        }
        else AuthService.isConnected = false;
    }
}