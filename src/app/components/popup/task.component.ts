import { Component, OnInit, Inject, ViewEncapsulation, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { taskService } from "./services/task.service";
import { dropdownValidator } from "./services/task.validator";


@Component({
  selector: "app-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class taskComponent implements OnInit{
  constructor(private taskService: taskService) {}


  @Input() createTaskDisplay:boolean;
  @Output() createTaskDisplayToParent = new EventEmitter<any>()
  
  createTaskDisplayChange = this.createTaskDisplay;
  createTaskDisplayPass(){
    this.createTaskDisplayToParent.emit();
  }


  errorMessage:any;

  createTaskGrowl(severity, summary, detail) {
    this.errorMessage = [];
    this.errorMessage.push({ severity: severity, summary: summary, detail: detail });
  }
//defining form group
  task: FormGroup;

//defining options which will be injected in form  
  sourceTaskOptions: object;
  reasonOptions: object;
  ordersOptions: object
  rxOptions: object;
  RxorOrderOptions: object = [
              {value: "", name: "Please select Source"}
             ];
  
             
//showing dialog box 
   showDialog() {
     this.createTaskDisplay = true;
  };

        
 //  subcribing and retriving data from database
 getTaskSource(){
   this.taskService.getTaskSource().subscribe(
     (res) =>{
       this.sourceTaskOptions = res;
     },
     (error)=>{
       this.errorMessage = error;
       this.createTaskGrowl('error', 'error', error.statusText)
       console.log(error);
       
     }
   );
 };

 getTaskReason() {
  this.taskService.getTaskReason().subscribe(
      (res) => {
        this.reasonOptions = res;
      },
      (error) => {
        this.errorMessage = error;
        this.createTaskGrowl('error', 'error', error.statusText)
        console.log(this.errorMessage);
      }
    );
  };

  getOrderId() {
    this.taskService.getOrderId('patient-1').subscribe(
      (res) => {
      this.ordersOptions = res;
      },
      (error) => {
        this.errorMessage = error;
        this.createTaskGrowl('error', 'error', error.statusText)
        console.log(this.errorMessage);
      }
   );
  };
  
  getRxId() {
    this.taskService.getRxId('patient-1').subscribe(
      (res) => {
        this.rxOptions = res;
      },
      (error) => {
        this.errorMessage = error;
        this.createTaskGrowl('error', 'error', error.statusText)
        console.log(this.errorMessage);
      }
    );
  };
  
  // responseOfFormSubmitted:object;
  // createTask(){
  //   this.taskService.createTask(this.taskValue).subscribe(
  //     (res) => this.responseOfFormSubmitted = res
  //     , (error) => {
  //       this.errorMessage = error;
  //     }
  //   );
  // };

  //changing RxId or OrderId
  
  rxOrderTitle = "Rx/Order";
  rxIdorOrderIdChange(sourceOfTaskValue) {
    if (sourceOfTaskValue === "Rx") {
      this.task.controls.rxOrOrders.reset()
      this.RxorOrderOptions = this.rxOptions;
      this.rxOrderTitle = sourceOfTaskValue;
    } else if (sourceOfTaskValue === "Order") {
      this.task.controls.rxOrOrders.reset()
      this.RxorOrderOptions = this.ordersOptions;
      this.rxOrderTitle = sourceOfTaskValue;
    } else {
      this.RxorOrderOptions = [{ value: "", name: "Please select Source" }];
      this.rxOrderTitle = "Rx/Order";

    }
  };

  

  //Creating a object which should be posted adter submitting
  submittedSourceOfTask: any;
  submittedReason: any;
  submittedRxOrOrder: any;
  submittedDate: any;
  submittedTime: any;
  submittedComments: any;
  
  taskValue: object;
  submittedValue(){
    this.submittedSourceOfTask = this.task.value.sourceOfTask.value;
    this.submittedReason = this.task.value.reason.value;
    this.submittedRxOrOrder = this.task.value.rxOrOrders.value;
    this.submittedDate = this.task.value.date;
    this.submittedTime = this.task.value.time; 
    this.submittedComments = this.task.value.comments;
    
    this.taskValue = {
      sourceOfTask: this.submittedSourceOfTask,
      RxorOrderValue: this.submittedRxOrOrder,
      reasonValue: this.submittedReason,
      date: this.submittedDate,
      time: this.submittedTime,
      comments: this.submittedComments
    };
    
    console.log(this.taskValue);
   }
   
   
   //submiting task form
   ontaskSubmit() {
     if (this.task.invalid) {
       this.createTaskDisplay = true;
       if (this.task.controls.comments.errors !== null){
         if (this.task.controls.comments.errors.optionNotSelected){
           this.createTaskGrowl('error', 'error', 'Please fill all the feilds')
        } else if (this.task.controls.comments.errors.noMoreThan2000){
          this.createTaskGrowl('error', 'error', 'comments should be less than 2000 character')
         }
       }else{
         this.createTaskGrowl('error', 'error', 'Please fill all the feilds')
       }

     }else{
         this.submittedValue()
        //  this.createTask();
         this.createTaskDisplay = false;
         this.createTaskGrowl('success', 'Success!', 'Successfully');
         this.createTaskDisplayPass()     
     }
   };
 
   
   //cancel task form
   onTaskCancel(){
     this.createTaskDisplay = false;
     this.task.reset();
     this.defaultValues();
     this.createTaskDisplayPass()     
   };


  //set Default values
  
  defaultValues(){
    this.getTaskSource();
    this.getTaskReason();
    this.getOrderId();
    this.getRxId();
    this.RxorOrderOptions = [
      { value: "", name: "Please select Source" }
    ];
    this.rxOrderTitle = "Rx/Order"
  };
  
  //validating date. it should not allow users to choose past days
  createTaskminDate;
  dateValidation() {
    let createTasktoday = new Date();
    this.createTaskminDate = createTasktoday
  }



    ngOnInit() {
     this.task = new FormGroup({
       "sourceOfTask": new FormControl("", dropdownValidator),
       "reason": new FormControl("", dropdownValidator),
       "date": new FormControl("", Validators.required),
       "time": new FormControl(""),
       "rxOrOrders": new FormControl("", dropdownValidator),
       "comments": new FormControl("", dropdownValidator)
    });

      this.defaultValues();
      this.dateValidation();
  };


};