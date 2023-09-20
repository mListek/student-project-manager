import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginPageComponent } from "./components/login-page/login-page.component";
import { RegisterPageComponent } from "./components/register-page/register-page.component";
import { TaskPageComponent } from "./components/task-page/task-page.component";
import { TaskDetailsPageComponent } from "./components/task-details-page/task-details-page.component";
import { MessagePageComponent } from "./components/message-page/message-page.component";
import { FilePageComponent } from "./components/file-page/file-page.component";
import { SettingPageComponent } from "./components/setting-page/setting-page.component";
import { GroupPageComponent } from "./components/group-page/group-page.component";
import { GroupDetailsPageComponent } from "./components/group-details-page/group-details-page.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'tasks', component: TaskPageComponent },
  { path: 'tasks/:id', component: TaskDetailsPageComponent },
  { path: 'messages', component: MessagePageComponent },
  { path: 'files', component: FilePageComponent },
  { path: 'settings', component: SettingPageComponent },
  { path: 'groups', component: GroupPageComponent },
  { path: 'groups/:id', component: GroupDetailsPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}