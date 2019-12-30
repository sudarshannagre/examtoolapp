import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './register/register/register.component';
import { ViewComponent } from './view/view.component';
import { UploadComponent } from './upload/upload.component';
import { InitcapPipe } from './_pipes/initcap.pipe';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile/profile.component';
import { AlertComponent } from './_component/alert/alert.component';
import { UsersComponent } from './users/users/users.component';
import { ForgotComponent } from './forgot/forgot/forgot.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ViewComponent,
    UploadComponent,
    InitcapPipe,
    ProfileComponent,
    AlertComponent,
    UsersComponent,
    ForgotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,HttpClientModule,ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
