import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { AuthService } from '../global/auth.service';
import { BasePage } from '../global/base.page';
import { BetDto } from '../providers/api-client.generated';
import { LoginPage } from './login/login.page';
import { ViewBetPage } from './modal/view-bet/view-bet.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent extends BasePage {

  AuthService = AuthService;
  constructor(
    public modalController: ModalController,
    public router: Router,
  ) {
    super();
  }

  ngOnInit() {
  }

  async openBetModal() {
    const modal = await this.modalController.create({
      component: ViewBetPage,
      cssClass: 'my-modal',
      backdropDismiss: true,
      showBackdrop: true,
      swipeToClose: true,
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      this.setConnectedUser();
    }

    return;
  }

}
