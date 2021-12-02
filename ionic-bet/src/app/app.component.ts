import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LoginPage } from './login/login.page';
import { ViewBetPage } from './modal/view-bet/view-bet.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public modalController: ModalController,
    public router: Router
  ) { }

  async openBetModal() {
    const modal = await this.modalController.create({
      component: ViewBetPage,
      cssClass: 'my-modal',
      backdropDismiss: true,
      showBackdrop: true,
      swipeToClose: true,
    });
    return await modal.present();
  }

}
