import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { UploadComponent } from './upload/upload.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './register/register/register.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { UsersComponent } from './users/users/users.component';
import { ForgotComponent } from './forgot/forgot/forgot.component';


const routes: Routes = [
  {path: "",redirectTo:"\login", pathMatch:"full"},
  {path : "view", component : ViewComponent},
  {path : "upload", component : UploadComponent},
  {path : "login", component : LoginComponent},
  {path : "register", component : RegisterComponent},
  {path : "profile", component : ProfileComponent},
  {path : "users", component : UsersComponent},
  {path : "forgot", component : ForgotComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
