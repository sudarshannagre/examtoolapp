import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TestsTypes } from '../_models/TestsTypes';

@Injectable({
  providedIn: 'root'
})
export class TesttypeService {
  baseURL ="http://localhost:9090/examtool/api/v1/";
  testTypes : TestsTypes[];
  
  myheader={
    headers : new HttpHeaders({
      'Access-Control-Allow-Origin':'http://localhost:4200'
    })
  };

  constructor(private _http : HttpClient) {

   }

   getTestsTypesList(): Observable<TestsTypes[]>{
     
     return this._http.get<TestsTypes[]>(this.baseURL+"testtypes",this.myheader);
   }

}
