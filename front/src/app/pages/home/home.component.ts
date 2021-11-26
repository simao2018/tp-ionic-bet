import { Component, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { GlobalService } from "../../../services/global.service";

@Component({
  selector : 'app-home',
  templateUrl : './home.component.html',
  styleUrls : ['./home.component.scss'],
  encapsulation : ViewEncapsulation.None
})

export class HomeComponent{

  isConnected : 'oui' | 'non';
  constructor(
    private router : Router
  ){

  }

  ngOnInit(){
    console.log('test home ok');
    GlobalService.isConnected.subscribe(x => {
      console.log("🚀 ~ ngOnInit ~ x", x)
      this.isConnected = x ? 'oui' : 'non';
    })
  }

  logout(){
    GlobalService.isConnected.next(false);
    this.router.navigateByUrl('login');
  }

}
