import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/_services/login.service';
import { User } from 'src/app/_models/user';
import { UsersService } from 'src/app/_services/users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  changePasswordForm : FormGroup;
  currentUser : any;
  edit=true;
  save=false;
  changePwd=true;
  changeBtn=false;
  submitted=false;
  response;

  constructor(private _loginService : LoginService, private _userService: UsersService,private formBuilder: FormBuilder) { 
    if(this._loginService.currentUserValue){
      this.currentUser = this._loginService.currentUserValue;
      //alert(JSON.stringify(this.currentUser));
    }
  }

  onClickEdit(){
    this.edit = false;
    this.save = true;
  }

  onClickSave(user : User){
    this._userService.userUpdate(user).subscribe(user=>{alert("User Update Success")
      this.edit=true;
      this.save=false;
      this.currentUser = this._loginService.currentUserValue;
    }
    );
  }

  changePassword(user : any,id : any){
   if(user.newPwd!="" && user.oldPwd!="" && user.cPwd!=""){
      if(user.newPwd != user.cPwd){
        alert("New Password and Confirm Password mismatch");
        this.formReset();
      }else{
        
        this._userService.changePassword(id,user.oldPwd,user.newPwd).subscribe(
          data => {        
        },
        error => {
          this.response = error.error.text;
          if(this.response=="Password Change successfully"){
            this.changePwd=true;
            this.changeBtn=false;
            alert("Password Change successfully");
          }else{
            alert("Old Password is Wrong");
            this.formReset();
          }
        }
        );
      }
   }else{
      this.submitted = true;
   }
  }

  onClickChange(){
    this.changePwd=false;
    this.changeBtn=true;
  }

  formReset(){
    this.submitted = false;
    this.changePasswordForm.reset();
  }

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      oldPwd: ['', Validators.required],
      newPwd: ['', Validators.required],
      cPwd: ['', Validators.required],
    });
  }
  get f() { return this.changePasswordForm.controls; }

}
