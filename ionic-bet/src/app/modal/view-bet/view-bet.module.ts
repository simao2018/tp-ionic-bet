import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewBetPageRoutingModule } from './view-bet-routing.module';

import { ViewBetPage } from './view-bet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewBetPageRoutingModule
  ],
  declarations: [ViewBetPage]
})
export class ViewBetPageModule {}
