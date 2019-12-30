import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TesttypeService } from '../_services/testtype.service';
import { TestsTypes } from '../_models/TestsTypes';
import { Questions } from '../_models/Questions';
import { QuestionsService } from '../_services/questions.service';
import { LoginService } from '../_services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  providers:[TesttypeService]
})
export class ViewComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  editBtn = true;
  editedQuestionNo: number;
  selected;
 // testarea=true;
  insertHidden = 'none';
  testTypeList : TestsTypes[];
  questionsList : Questions[] = [];
  testType : TestsTypes = new TestsTypes();
  question : Questions = new Questions();

  constructor(private _testTypeService:TesttypeService, private _questionService:QuestionsService,private formBuilder: FormBuilder, private _loginService: LoginService, private router: Router) {   
  //   if (this._loginService.currentUserValue) { 
  //     this.router.navigate(['login']);
  // }
   }

   //Used to get QuestionList base on Test types
   getQuestionsList(e){
      this.insertHidden = 'none';
      this.selected = e.target.value;
      this.questionsListBasedOnType(this.selected);
   };

   questionsListBasedOnType(type){
    this._questionService.getQuestionsList(this.selected).subscribe(list=>this.questionsList=list);
   }
   //Used to delete the selected question
   deleteQuestion(question : Questions) : void{
    this._questionService.deleteQuestion(question).subscribe(data => this.questionsList = this.questionsList.filter(q=>q !== question));
  };

  editQuestion(id: number) : void{
    //alert(question.question);
    //this.testarea=false;

    this.editBtn=false;
    this.editedQuestionNo = id;
  };

  updateQuestion(question : Questions){
   // this.testarea=true;
    this.editBtn=true;
    this._questionService.updateQuestion(question).subscribe((payload) => {
        console.log(payload);
        this.questionsListBasedOnType(this.selected);
    });
    this.editedQuestionNo = -1;
  }
  
  ngOnInit() {
    //use for validation
    this.registerForm = this.formBuilder.group({
      question: ['', Validators.required],
      option1: ['', Validators.required],
      option2: ['', Validators.required],
      option3: ['', Validators.required],
      option4: ['', Validators.required],
      rightOption: ['', Validators.required],

    });
    this._testTypeService.getTestsTypesList().subscribe(list=>this.testTypeList=list);
  }
  get f() { return this.registerForm.controls; }

  onSubmit(data) {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    this.testType.id = this.selected;
    data.testType = this.testType;
   // alert(data.id)
    this.insertQuestion(data);

}
  //used to display question insert table
  showInsert(){
    this.insertHidden='';
  }

  //used for trackBy
  byQuestion(index: number, question : Questions):string{
    return question.question;
  }

  //Used to insert new question against the test type
  insertQuestion(data : Questions): void{
    this._questionService.insertQuestion(data).subscribe(que => {alert("Question inserted successfully.")
    this.questionsListBasedOnType(this.selected);
  });
   // this.questionsListBasedOnType(this.selected);
   this.insertHidden = "none";
    this. onReset();
  }
 
  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
