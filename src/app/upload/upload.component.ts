import { Component, OnInit } from '@angular/core';
import { Questions } from '../_models/Questions';
import { TestsTypes } from '../_models/TestsTypes';
import { TesttypeService } from '../_services/testtype.service';
import { QuestionsService } from '../_services/questions.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  questionsList : Questions[];
  testTypeList : TestsTypes[];
  
  constructor(private _testTypeService : TesttypeService,private _questionService:QuestionsService) {
    this._questionService.getAllQuestionsList().subscribe(list=>this.questionsList=list);
   }

  ngOnInit() {
    this._testTypeService.getTestsTypesList().subscribe(list=>this.testTypeList=list);
   };
}
