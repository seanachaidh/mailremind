import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdNavBasic } from "./navbar/nav-basic";
import { MainFormComponent } from "./dialogs/main-form";
import { GmailForm } from "./dialogs/gmail-form";
import { HourClock } from "./hourclock/hourclock";
import { AmPm, ClockNumber } from './hourclock/clocknumber';

import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    NgbdNavBasic,
    MainFormComponent,
    HourClock,
    AmPm,
    ClockNumber,
    GmailForm
  ],
  imports: [
    BrowserModule,
    NgbModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
