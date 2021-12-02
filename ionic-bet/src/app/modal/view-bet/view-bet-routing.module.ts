import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewBetPage } from './view-bet.page';

const routes: Routes = [
  {
    path: '',
    component: ViewBetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewBetPageRoutingModule {}
