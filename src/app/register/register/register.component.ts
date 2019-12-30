import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/_models/user';
import { UsersService } from 'src/app/_services/users.service';
import { Role } from 'src/app/_models/Role';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/_services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  loading = false;
  role:Role = new Role();

  constructor(private router: Router,private formBuilder: FormBuilder,private _user:UsersService,private _alertService:AlertService) { }

  ngOnInit() {
    //use for validation
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      password: ['', Validators.required],
      cpwd: ['', Validators.required],
    });
  }
  get f() { return this.registerForm.controls; }

  
  onSubmit(data) {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    this.userRegistration(data);
  }

  userRegistration(data: User){
    this.role.id=2;
    data.role=this.role;
    this._user.userRegisatrion(data).pipe(first())
    .subscribe(
        data => {
            this._alertService.success('Registration successful', true);
            this.router.navigate(['/login']);
        },
        error => {
            this._alertService.error(error);
            this.loading = false;
        });
    //.subscribe(que => {alert("User Registration successfully.")},
    //);
   // this.router.navigate(["login"]);
  }
}
