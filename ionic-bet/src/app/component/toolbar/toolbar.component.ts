import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginPage } from '../../login/login.page';
import { AuthService } from '../../../global/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {

  public AuthService = AuthService;
  constructor(
    public modalController: ModalController,
  ) { }

  ngOnInit() { }

  async openLogin() {
    const modal = await this.modalController.create({ component: LoginPage });
    await modal.present();
  }

}
