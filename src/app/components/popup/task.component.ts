import { Component, OnInit, Inject, ViewEncapsulation } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { taskService } from "./services/task.service";

@Component({
  selector: "app-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class taskComponent implements OnInit{
  constructor(private taskService: taskService) {}


//creating form group
  task: FormGroup;

  
  sourceTaskOptions: Array<object>;
  reasonOptions: Array<object>;
  ordersOptions: Array<object>
  rxOptions: Array<object>;
  RxorOrderOptions: Array<object> = [
              {value: "", name: "Please select Source"}
             ];
  
  rxOrderTitle = "Rx/Order";
  display = false;
  taskValue: Array<object>;
  

  
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
        // console.log(this.ordersOptions);
      },
      (error) => {
        console.log(error)
      }
    );
  };

  getRxId() {
    this.taskService.getRxId('patient-2').subscribe(
      (res) => {
        this.rxOptions = res;
        // console.log(this.rxOptions);
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



//showing dialog box 
  showDialog() {
    this.display = true;
  };


//submiting form
  ontaskSubmit() {
    this.display = false;
      this.taskValue = this.task.value;
      console.log(this.taskValue);
      this.createTask()
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


  //cancel task form
  onTaskCancel(){
    this.display = false;
    this.task.reset();
    this.defaultValues();
  };

  //changing RxId or OrderId
  rxIdorOrderId() {
    const getSourceTask = this.task.value.sourceOfTask;
    if (getSourceTask === "Rx") {
      this.RxorOrderOptions = this.rxOptions;
      this.rxOrderTitle = getSourceTask;

    } else if (getSourceTask === "Order") {

      this.RxorOrderOptions = this.ordersOptions;
      this.rxOrderTitle = getSourceTask;
       
    } else {

      this.RxorOrderOptions = [{value: "", name: "Please select Source"}];
      this.rxOrderTitle = "Rx/Order";

    }
  };

    ngOnInit() {
     this.task = new FormGroup({
       "sourceOfTask": new FormControl("", null),
       "reason": new FormControl("", null),
       "dateTime": new FormControl(null, Validators.required),
       "orders": new FormControl("", null),
       "comments": new FormControl(`TEXT COMMENTS LINE 1,
TEXT COMMENTS LINE 2`, Validators.required)
    });

      this.defaultValues();
  };
};