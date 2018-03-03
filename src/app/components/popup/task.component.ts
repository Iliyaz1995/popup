import { Component, OnInit, Inject, ViewEncapsulation } from "@angular/core";
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
  display = false;
   showDialog() {
     this.display = true;
  };

        
 //  subcribing and retriving data from database
 getTaskSource(){
   this.taskService.getTaskSource().subscribe(
     (res) =>{
       this.sourceTaskOptions = res;
     },
     (error)=>{
       console.log(error)
     }
   );
 };

 getTaskReason() {
  this.taskService.getTaskReason().subscribe(
      (res) => {
        this.reasonOptions = res;
      },
      (error) => {
        console.log(error)
      }
    );
  };

  getOrderId() {
    this.taskService.getOrderId('patient-1').subscribe(
      (res) => {
      this.ordersOptions = res;
      },
      (error) => {
        console.log(error)
      }
   );
  };
  
  getRxId() {
    this.taskService.getRxId('patient-1').subscribe(
      (res) => {
        this.rxOptions = res;
      },
      (error) => {
        console.log(error)
      }
    );
  };
  
  createTask(){
    this.taskService.createTask(this.taskValue).subscribe(
      (res) => console.log(res)
      ,(error) => console.log(error)
    );
  };

  //changing RxId or OrderId
  
  rxOrderTitle = "Rx/Order";
  rxIdorOrderId() {
    const getSourceTask = this.task.value.sourceOfTask.value;
    console.log(getSourceTask);

    if (getSourceTask === "Rx") {
      this.RxorOrderOptions = this.rxOptions;
      this.rxOrderTitle = getSourceTask;

    } else if (getSourceTask === "Order") {
      this.RxorOrderOptions = this.ordersOptions;
      this.rxOrderTitle = getSourceTask;

    } else {
      this.RxorOrderOptions = [{ value: "", name: "Please select Source" }];
      this.rxOrderTitle = "Rx/Order";

    }
  };

  

  //editing Time

  // taskTimeToString(){
  //   var selectedTime = this.task.value.time;
  //   var extractingTime = new Date(selectedTime.toString()).toTimeString().slice(0, 5);
  //   this.submittedTime = extractingTime
  // }


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
       this.display = true;
     }else{
       this.display = false;
       this.submittedValue()
       this.createTask();
     }
   };
 
   
   //cancel task form
   onTaskCancel(){
     this.display = false;
     this.task.reset();
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

  //validating date. it should not allow users to choose past days
  createTaskMinTime;
  timeValidation() {
    let createTasktime = new Date();
    this.createTaskMinTime = createTasktime;
  }



    ngOnInit() {
     this.task = new FormGroup({
       "sourceOfTask": new FormControl("", dropdownValidator),
       "reason": new FormControl("", dropdownValidator),
       "date": new FormControl("", Validators.required),
       "time": new FormControl("", Validators.required),
       "rxOrOrders": new FormControl("", dropdownValidator),
       "comments": new FormControl(`TEXT COMMENTS LINE 1,
TEXT COMMENTS LINE 2`, Validators.required)
    });

      this.defaultValues();
      this.dateValidation();
      this.timeValidation();
  };


};