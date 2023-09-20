import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TeamListComponent } from './components/team-list/team-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MessageListComponent } from './components/message-list/message-list.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TaskPageComponent } from './components/task-page/task-page.component';
import { MessagePageComponent } from './components/message-page/message-page.component';
import { TaskDetailsPageComponent } from './components/task-details-page/task-details-page.component';

@NgModule({
  declarations: [
    AppComponent,
    TeamListComponent,
    TaskListComponent,
    MessageListComponent,
    LoginPageComponent,
    RegisterPageComponent,
    NavbarComponent,
    TaskPageComponent,
    MessagePageComponent,
    TaskDetailsPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
