import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class taskService {
constructor(private http: Http) {}

  url:string = 'https://my-json-server.typicode.com/Iliyaz1995/sampleDatabase/';

getTaskSource = () => {
  return this.http.get(this.url +'taskSource').map(
      (res) => res.json()
    )
}

getTaskReason = () => {
    return this.http.get(this.url+ 'taskReason').map(
      (res) => res.json()
    )
}
 
getOrderId = (patientId) => {
  return this.http.get(this.url +'ordersOptions').map(
      (res) => res.json()[patientId]
    )
}

getRxId = (patientId) => {
  return this.http.get(this.url +'rxOptions').map(
      (res) => res.json()[patientId]
    )
}

createTask = (task) => {
  return this.http.put(this.url +'submittedData', task).map(
      (res) => res.json()
    )
 }

}
