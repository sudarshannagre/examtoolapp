import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/_services/login.service';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  forgotForm: FormGroup;
  submitted = false;

  constructor(private router: Router,private formBuilder: FormBuilder, private _loginService : LoginService, private _userService: UsersService) {
    if (this._loginService.currentUserValue) { 
      this.router.navigate(['view']);
    }
  }

  ngOnInit() {
    //use for validation
    this.forgotForm = this.formBuilder.group({
      email: ['', Validators.required],
    });
  }
  get f() { return this.forgotForm.controls; }

  onSubmit(data){
    this.submitted = true;
    alert(JSON.stringify(data.email));
    
    if (this.forgotForm.invalid) {
      return;
    }

    this._userService.forgotPassword(data.email).subscribe(data => {
      this.resetForm();
      //alert("New Password is send to your mail, Please check your mail.");
      this.router.navigate(['login']);
    });
  }

  resetForm(){
    this.submitted = false;
    this.forgotForm.reset();
  }
}
