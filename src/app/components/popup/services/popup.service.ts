import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
// import { API_ENDPOINT_CONFIG } from '../../environments/environment';


@Injectable()
export class PopupService {
constructor(private http: Http) {}

// url = [API_ENDPOINT_CONFIG.edgeProxyEndpoint, '/task-component'].join('');

// getRxOrderOptions = () => {
//   return this.http.get(url).subscribe(
//     (response)=>  response.json(),
//     error => {
//        Observable.throw(error);
//  });
// }


ordersOptions: Array<object> = [
{value: '', name: '-SELECT-'},
{value: 'Order options', name: 'order option'},
{value: 12345, name: 12345},
{value: 56789, name: 56789}
];


rxOptions: Array<object> = [
{value: '', name: '-SELECT-'},
{value: 'RX options', name: 'Rx options'},
{value: 98765, name: 98765},
{value: 54321, name: 54321}
];

}
