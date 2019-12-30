import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/_services/login.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  user : User = new User();

  constructor(private router: Router,private formBuilder: FormBuilder, private _loginService : LoginService) {
    if (this._loginService.currentUserValue) { 
      this.router.navigate(['view']);
  }
   }

  ngOnInit() {
    //use for validation
    this.registerForm = this.formBuilder.group({
      uname: ['', Validators.required],
      pwd: ['', Validators.required],
    });
  }
  get f() { return this.registerForm.controls; }

  onSubmit(data) {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    this.getLogedInUser(data);
  }

  getLogedInUser(data){
    this._loginService.logedInUser(data).pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['view']);
                },
                error => {
                  alert("Username or password is incorrect");
                  this.onReset();
                })
  }
   
  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
