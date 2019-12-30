import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../_models/user';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = "http://localhost:9090/examtool/api/v1/users/";

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  myheader={
    headers : new HttpHeaders({
      'Access-Control-Allow-Origin':'http://localhost:4200'
    })
  };

  constructor(private _http : HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  logedInUser(data) : Observable<User>{
    return this._http.get<User>(this.baseUrl+data.uname+"/"+data.pwd,this.myheader).pipe(map(user=>
      {
        // login successful if there's a jwt token in the response
        if (user) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
        }
        return user;
    }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
}

}
