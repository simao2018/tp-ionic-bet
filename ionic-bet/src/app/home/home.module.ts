import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { MatchService } from '../../providers/api-client.generated/api/match.service';
import { ToolbarModule } from '../component/toolbar/toolbar.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToolbarModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage],
})
export class HomePageModule { }
