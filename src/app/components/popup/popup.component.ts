import { Component, OnInit, Inject,ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { popupService } from './services/popup.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PopupComponent {
  constructor(private popupService:popupService) {}

    a = 1;
    b = 3;
    c = (this.a + this.b)
  display: boolean = false;
  showDialog() {
     this.display = true;
     };



  patientTaskForm:FormGroup;
  sourceTaskOptions:Array<object> = [
                                      {value: "",name: "-SELECT-"},
                                      {value: "Rx",name: "Rx"},
                                      {value: "Order",name: "Order"}
                                     ];


  reasonOptions:Array<object> = [
                                  {value: "",name: "-SELECT-"},
                                  {value: "Insurance Diversion",name: "Insurance Diversion"},
                                  {value: "Clinical Review Diversions",name: "Clinical Review Diversions"},
                                  {value: "Other",name: "Counseling Diversion"}
                                  ];

  RxorOrderOptions:Array<object> = [
                                     {value: "",name: "Please select Source"}
                                   ];




  // getRxOrderOptions(){
  //   this.popupService.getRxOrderOptions.subscribe(response=>{
  //     this.ordersOptions = response.orderOptions;
  //     this.rxOptions = response.rxOptions;
  //     })
  // }


  ordersOptions:Array<object> = this.popupService.ordersOptions;
  rxOptions:Array<object> = this.popupService.rxOptions;




  submittedData:Array<object>;
  rxOrderTitle:string = 'Rx/Order';


  onPatientTaskFormSubmit(){
      this.submittedData = this.patientTaskForm.value
      console.log(this.submittedData);
      console.log(this.patientTaskForm)
      this.display = true;
  };

  optionChange(){
    var getSourceTask = this.patientTaskForm.value.sourceOfTask
    console.log(getSourceTask)
    if (getSourceTask === "Rx") {

      this.RxorOrderOptions = this.rxOptions;
      this.rxOrderTitle = getSourceTask;

    }else if(getSourceTask === "Order"){

      this.RxorOrderOptions = this.ordersOptions;
      this.rxOrderTitle = getSourceTask;

    }else{

      this.RxorOrderOptions = [{value: "",name: "Please select Source"}]
      this.rxOrderTitle = "Rx/Order";

    };
  };


  ngOnInit(){
     this.patientTaskForm = new FormGroup({
       "sourceOfTask": new FormControl('',null),
       "reason": new FormControl('',null),
       "dateTime": new FormControl(null, Validators.required),
       "orders": new FormControl('',null),
       "priority": new FormControl(false),
       "comments": new FormControl(`TEXT COMMENTS LINE 1,
TEXT COMMENTS LINE 2`, Validators.required)
    });
  };
};