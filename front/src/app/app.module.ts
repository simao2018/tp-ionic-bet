import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BASE_PATH } from '../providers/api-client.generated';
import { DialogModule } from './components/dialog/dialog.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DialogModule,
  ],
  providers: [
    { provide: BASE_PATH, useValue: 'http://localhost:3018' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
