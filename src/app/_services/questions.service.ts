import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Questions } from '../_models/Questions';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  baseURL ="http://localhost:9090/examtool/api/v1/questions/";
  //questionsList : Questions[];
  
  myheader={
    headers : new HttpHeaders({
      'Access-Control-Allow-Origin':'http://localhost:4200'
    })
  };


  constructor(private _http : HttpClient) {

   }

   getQuestionsList(id :number): Observable<Questions[]>{
     return this._http.get<Questions[]>(this.baseURL+"types/"+id,this.myheader);
   }

   deleteQuestion(question : Questions) : Observable<any>{
     return this._http.delete(this.baseURL+question.id);
  }
  public insertQuestion(question : Questions) : Observable<any>{
    return this._http.post(this.baseURL, question);
  }

  //used to get all types of questions
  getAllQuestionsList():Observable<Questions[]>{
    return this._http.get<Questions[]>(this.baseURL,this.myheader);
  }

  updateQuestion(question : Questions) : Observable<Questions>{
    return this._http.put<Questions>(this.baseURL,question);
  }
}
