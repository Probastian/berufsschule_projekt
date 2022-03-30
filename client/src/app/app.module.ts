import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import routes from "./router.config";

import { AppComponent } from './app.component';
import { TopbarComponent } from './component/topbar/topbar.component';
import { LoginComponent } from './component/login/login.component';
import { RouterModule } from '@angular/router';
import { BasepageComponent } from './component/basepage/basepage.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TopicsModule } from './modules/topics/topics.module';
import { UserComponent } from './modules/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    LoginComponent,
    BasepageComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FontAwesomeModule,
    TopicsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
