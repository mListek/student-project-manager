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
import { GuestGuard } from "./auth/guest.guard";
import { UserGuard } from "./auth/user.guard";
import { TeacherGuard } from "./auth/teacher.guard";

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent, canActivate: [UserGuard] },
  { path: 'register', component: RegisterPageComponent, canActivate: [UserGuard] },
  { path: 'tasks', component: TaskPageComponent, canActivate: [GuestGuard] },
  { path: 'tasks/:id', component: TaskDetailsPageComponent, canActivate: [GuestGuard] },
  { path: 'messages', component: MessagePageComponent, canActivate: [GuestGuard] },
  { path: 'files', component: FilePageComponent, canActivate: [GuestGuard] },
  { path: 'settings', component: SettingPageComponent, canActivate: [GuestGuard] },
  { path: 'groups', component: GroupPageComponent, canActivate: [GuestGuard, TeacherGuard] },
  { path: 'groups/:id', component: GroupDetailsPageComponent, canActivate: [GuestGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}