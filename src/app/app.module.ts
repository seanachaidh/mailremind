import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdNavBasic } from "./navbar/nav-basic";
import { MainFormComponent } from "./dialogs/main-form";
import { HourClock } from "./hourclock/hourclock";
import { AmPm, ClockNumber } from './hourclock/clocknumber';

@NgModule({
  declarations: [
    AppComponent,
    NgbdNavBasic,
    MainFormComponent,
    HourClock,
    AmPm,
    ClockNumber
  ],
  imports: [
    BrowserModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
