import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/_services/users.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userList : User[];

  constructor(private _http : UsersService) { 
    this._http.userList().subscribe(list=>this.userList=list);;
  }

  ngOnInit() {
  }

  checkClick(e,user){
    user.enable = e.target.checked;
   // alert(JSON.stringify(user));
   if(window.confirm('Are you sure, you want to Enabled/Disbaled this user?')){
    this._http.userUpdate(user).subscribe();
   }
  }
}
