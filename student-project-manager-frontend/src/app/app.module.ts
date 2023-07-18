import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TeamListComponent } from './components/team-list/team-list.component';
import { HttpClientModule } from '@angular/common/http';
import { TeamService } from './services/team.service';

@NgModule({
  declarations: [
    AppComponent,
    TeamListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [TeamService],
  bootstrap: [AppComponent]
})
export class AppModule { }
