import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { EventsModule } from './modules/events/events.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorModule } from './modules/error';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    EventsModule,

    BrowserAnimationsModule,

    ErrorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
