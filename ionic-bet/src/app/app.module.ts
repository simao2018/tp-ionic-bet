import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomInterceptor } from '../global/interceptor.service';
import { BASE_PATH } from '../providers/api-client.generated';
import { ViewBetPageModule } from './modal/view-bet/view-bet.module';
import { AuthGuardService } from '../global/guards/guard.service';
import { TabModule } from './component/tabs/tabs.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ViewBetPageModule,
    TabModule,
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    },
    { provide: BASE_PATH, useValue: 'http://localhost:3018' },
    { provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true },
    AuthGuardService,
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule { }
