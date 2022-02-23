import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import routes from "./router.config";

import { AppComponent } from './app.component';
import { TopbarComponent } from './component/topbar/topbar.component';
import { LoginComponent } from './component/login/login.component';
import { RouterModule } from '@angular/router';
import { BasepageComponent } from './component/basepage/basepage.component';

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    LoginComponent,
    BasepageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
