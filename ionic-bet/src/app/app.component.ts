import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { AppService } from '../global/app.service';
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
    public appService: AppService,
  ) {
    super();

    this.UserTest.subscribe(user => {
      console.log("🚀 ~ user", user)
      // this.matchSelectedCount.next(user.bets[0]?.matchsSelected?.length ? user.bets[0]?.matchsSelected?.length : 0)
    })

  }

  ngOnInit() {
  }

  async openBetModal() {
    const modal = await this.modalController.create({
      component: ViewBetPage,
      breakpoints: [0, 0.4, 1],
      initialBreakpoint: 0.4,
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      this.appService.setConnectedUser();
    }

    return;
  }



}
