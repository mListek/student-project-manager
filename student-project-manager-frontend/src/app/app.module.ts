import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TaskPageComponent } from './components/task-page/task-page.component';
import { MessagePageComponent } from './components/message-page/message-page.component';
import { TaskDetailsPageComponent } from './components/task-details-page/task-details-page.component';
import { FilePageComponent } from './components/file-page/file-page.component';
import { SettingPageComponent } from './components/setting-page/setting-page.component';
import { GroupPageComponent } from './components/group-page/group-page.component';
import { GroupDetailsPageComponent } from './components/group-details-page/group-details-page.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    NavbarComponent,
    TaskPageComponent,
    MessagePageComponent,
    TaskDetailsPageComponent,
    FilePageComponent,
    SettingPageComponent,
    GroupPageComponent,
    GroupDetailsPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
