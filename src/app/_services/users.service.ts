import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseURL ="http://localhost:9090/examtool/api/v1/";  //http://localhost:9090/examtool/api/v1/users/2/qwerty/qwertyuioop

  response : any;
  constructor(private _http : HttpClient) { }

  userRegisatrion(data):Observable<any>{
    return this._http.post(this.baseURL+"users",data);
  }

  userUpdate(user):Observable<any>{
    return this._http.put(this.baseURL+"users",user);
  }

  userList():Observable<User[]>{
    return this._http.get<User[]>(this.baseURL+"users");
  }

  forgotPassword(email : any):Observable<any>{
    this.response= this._http.put(this.baseURL+"users/"+email,'');
    return this.response;
  }

  changePassword(id : any,oldPwd : any,newPwd : any):Observable<String>{
    return this._http.put<String>(this.baseURL+"users/"+id+"/"+oldPwd+"/"+newPwd,'');
  }
}
