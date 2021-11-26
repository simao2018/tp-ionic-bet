import { CommonModule } from "@angular/common";
import { Route } from "@angular/compiler/src/core";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./home.component";

const Routes = [{
  path : '',
  component : HomeComponent,
}]

@NgModule({
  declarations : [HomeComponent],
  imports : [
    CommonModule,
    RouterModule.forChild(Routes)
  ],
  exports : [RouterModule]
})

export class HomeModule{
}
