import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-view-bet',
  templateUrl: './view-bet.page.html',
  styleUrls: ['./view-bet.page.scss'],
})
export class ViewBetPage implements OnInit {

  constructor(
    public modalController: ModalController
  ) { }

  ngOnInit() {
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
