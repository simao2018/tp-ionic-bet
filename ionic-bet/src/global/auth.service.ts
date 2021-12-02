import { Injectable } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { BehaviorSubject } from "rxjs";
import { UserDto } from "../providers/api-client.generated";

@Injectable()
export class AuthService {
    public isConnectedSubject = new BehaviorSubject<boolean>(false);
    public AuthUserSubject = new BehaviorSubject<UserDto>(null);
    public AuthUser: UserDto;

    public isConnected = this.isConnectedSubject.getValue();
    public isLoading = new BehaviorSubject<boolean>(false);
    public loading: HTMLIonLoadingElement = null;

    constructor(public loadingController: LoadingController) {
    }
    async LoadingMode() {

        this.loading = await this.loadingController.create({
            cssClass: 'my-custom-class',
            message: 'Veuillez patienter...',
            duration: 200
        });

        await this.loading.present();
    }


}