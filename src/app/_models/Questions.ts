import { TestsTypes } from './TestsTypes';

export class Questions{
    id:number;
    question:string;
    option1:string;
    option2:string;
    option3:string;
    option4:string;
    rightOption:string;
    enable:boolean;
    testType:TestsTypes;
}