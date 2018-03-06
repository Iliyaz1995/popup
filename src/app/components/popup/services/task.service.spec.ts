import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { taskService } from './task.service';
import { error } from 'util';

describe('CreateTaskService', () => {
    let service: taskService;
    let httpMock: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [taskService]
        });
        service = TestBed.get(taskService);
        httpMock = TestBed.get(HttpTestingController);
    });
    // service.getTaskSource().subscribe((res) => {
    //     console.log(res);
    //     expect(res).toBeTruthy;
    // });
    // const req = httpMock.expectOne(`./assets/task.json`, 'taskSource');
    // expect(req.request.method).toBe('GET');

    // req.flush({
    //     name: 'sourceOfTask'
    // });

    // httpMock.verify();
    it('should get data from api successfully with only url param', () => {
    service.taskOptionsRequest('extention', undefined).subscribe((res) => {
        expect(res).toBeTruthy;
    },err => {
        expect(err).toBeTruthy
    });
    const req = httpMock.expectOne(`./assets/task.json`, 'extension');
    expect(req.request.method).toBe('GET');

    req.flush({
        name: 'sourceOfTask'
    });

    httpMock.verify();
    });

    it('should get data from api successfully with two params', () => {
        service.taskOptionsRequest('extention', 'id').subscribe((res) => {
            expect(res).toBeTruthy;
        }, err => {
            expect(err).toBeTruthy
        });
        const req = httpMock.expectOne(`./assets/task.json`, 'extension');
        expect(req.request.method).toBe('GET');

        req.flush({
            name: 'sourceOfTask'
        });

        httpMock.verify();
    });

    it('should call the taskOptionsRequest() function to get source of task data from api',() => {
         service.getTaskSource;
         expect(service.taskOptionsRequest).toHaveBeenCalled;
    });

    it('should call the taskOptionsRequest() function to get reasons data from api', () => {
        service.getTaskReason;
        expect(service.taskOptionsRequest).toHaveBeenCalled;
    });

    it('should call the taskOptionsRequest() function to get orderID data from api', () => {
        service.getOrderId;
        expect(service.taskOptionsRequest).toHaveBeenCalled;
    });
    
    it('should call the taskOptionsRequest() function to get RxID data from api', () => {
        service.getRxId;
        expect(service.taskOptionsRequest).toHaveBeenCalled;
    });

    // it('should put the correct data', () => {
    //     service.createTask({ form: 'form' }).subscribe((res: any) => {
    //         expect(res.form).toBe('firstname');
    //     });

    //     const req = httpMock.expectOne(`./assets/task.json`, 'submitted');
    //     expect(req.request.method).toBe('PUT');

    //     req.flush({
    //         form: 'form'
    //     });

    //     httpMock.verify();
    // });


});

