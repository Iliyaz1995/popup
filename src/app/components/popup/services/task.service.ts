import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class taskService {
constructor(private http:HttpClient) {}


  url: string = './assets/task.json';

taskOptionsRequest(extensionUrl, patientId){
  if(patientId == undefined){
    return this.http.get(this.url).map((res) => res[extensionUrl])
  }else if(extensionUrl !== undefined && patientId !== undefined){
    return this.http.get(this.url).map((res) => res[extensionUrl][patientId])
  }
};


getTaskSource = () => {
  return this.taskOptionsRequest('taskSource', undefined);
};
  
getTaskReason = () => {
  return this.taskOptionsRequest('taskReason', undefined);
};
 
getOrderId = (patientIdFromComponent) => {
  return this.taskOptionsRequest('ordersOptions', patientIdFromComponent)
};

getRxId = (patientId) => {
  return this.taskOptionsRequest('rxOptions', patientId)
}

// createTask = (task) => {
//   return this.http.put(this.url['submitted'], task).map(
//       (res) => res
//     )
//  }

}
