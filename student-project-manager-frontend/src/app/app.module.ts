import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TeamListComponent } from './components/team-list/team-list.component';
import { HttpClientModule } from '@angular/common/http';
import { TeamService } from './services/team.service';
import { TaskListComponent } from './components/task-list/task-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TeamListComponent,
    TaskListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [TeamService],
  bootstrap: [AppComponent]
})
export class AppModule { }
