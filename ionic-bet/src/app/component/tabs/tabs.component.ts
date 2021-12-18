import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { AppService } from "../../../global/app.service";
import { BasePage } from "../../../global/base.page";
import { UserDto } from "../../../providers/api-client.generated";
import { ViewBetPage } from "../../modal/view-bet/view-bet.page";

@Component({
    selector: 'app-tab',
    templateUrl: './tabs.component.html',
    styleUrls: [],
})

export class TabComponent extends BasePage {

    @Input('matchCount') matchCount: number;
    public AppService = AppService;
    constructor(
        public modalController: ModalController,
        public appService: AppService,
        private router: Router
    ) {
        super();
    }

    async openBetModal() {
        const modal = await this.modalController.create({
            component: ViewBetPage,
            cssClass: 'my-modal',
            backdropDismiss: true,
            showBackdrop: true,
            swipeToClose: true,
            componentProps: {
                authUser: AppService.AuthUser,
            }
        });

        await modal.present();

        const { data } = await modal.onDidDismiss();
        if (data) {
            this.appService.setConnectedUser();

            this.router.navigate(['historic']);
        }

        return;
    }
}