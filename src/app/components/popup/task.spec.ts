import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { taskComponent } from './task.component';
import { CalendarModule } from 'primeng/calendar';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { taskService } from './services/task.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { error } from 'util';


describe('TaskComponent', () => {
    let component: taskComponent;
    let fixture: ComponentFixture<taskComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                taskComponent
            ],
            imports: [
                ReactiveFormsModule,
                BrowserAnimationsModule,
                HttpModule,
                CalendarModule,
                CheckboxModule,
                DialogModule,
                DropdownModule,
                HttpClientModule

            ],
            providers: [taskService],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
            
            
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(taskComponent);
        component = fixture.componentInstance;
        
        fixture.detectChanges();
    
    });

    it('should create createTask component', async(() => {
        expect(component).toBeTruthy();
    }));

    it('should show the dialog box on button click', async(() => {
        component.showDialog();
        let createTaskDisplay = component.createTaskDisplay;
        expect(createTaskDisplay).toBe(true);
    }));

    it('should get source of task options from service', async(() => {
        let CreateTaskService = fixture.debugElement.injector.get(taskService);
        spyOn(CreateTaskService, 'getTaskSource').and.returnValues(
            Observable.from([{ "name": "SourceOfTaskOptions", "value": "SourceOfTaskOptions"}])
        );
        component.getTaskSource()
        var sourceTaskOptions = component.sourceTaskOptions;
        expect(sourceTaskOptions).toBeDefined();
    }));

    it('should trow a error message if somthing went wrong during http call to get source of task options', async(() => {
        let CreateTaskService = fixture.debugElement.injector.get(taskService);
        spyOn(CreateTaskService, 'getTaskSource').and.returnValues(
            Observable.throw('error from server')
        );
        component.getTaskSource()
        expect(component.errorMessage).toBeDefined();
    }));

    it('should get order id options from service', async(() => {
        let CreateTaskService = fixture.debugElement.injector.get(taskService);
        spyOn(CreateTaskService, 'getOrderId').and.returnValues(
            Observable.from([{ "name": "OrderId", "value": "OrderId" }])
        );
        component.getOrderId()
        var ordersOptions = component.ordersOptions;
        expect(ordersOptions).toBeDefined();
    }));

    it('should trow a error message if somthing went wrong during http call to get Order id', async(() => {
        let CreateTaskService = fixture.debugElement.injector.get(taskService);
        spyOn(CreateTaskService, 'getOrderId').and.returnValues(
            Observable.throw('error from server')
        );
        component.getOrderId()
        expect(component.errorMessage).toBeDefined();
    }));

    it('should get Rx id options from service', async(() => {
        let CreateTaskService = fixture.debugElement.injector.get(taskService);
        spyOn(CreateTaskService, 'getRxId').and.returnValues(
            Observable.from([{ "name": "RxId", "value": "RxId" }])
         );
        component.getRxId()
        var RxOptions = component.rxOptions;
        expect(RxOptions).toBeDefined();
    }));

    it('should trow a error message if somthing went wrong during http call to get Rx id', async(() => {
        let CreateTaskService = fixture.debugElement.injector.get(taskService);
        spyOn(CreateTaskService, 'getRxId').and.returnValues(
            Observable.throw('error from server')
        );
        component.getRxId()
        expect(component.errorMessage).toBeDefined();
    }));

    it('should get reasons options from service', async(() => {
        let CreateTaskService = fixture.debugElement.injector.get(taskService);
        spyOn(CreateTaskService, 'getTaskReason').and.returnValues(
            Observable.from([{ "name": "TaskReason", "value": "TaskReason" }])
        );
        component.getTaskReason()
        var reasonOptions = component.reasonOptions;
        expect(reasonOptions).toBeDefined();
    }));

    it('should trow a error message if somthing went wrong during http call to get reasons options', async(() => {
        let CreateTaskService = fixture.debugElement.injector.get(taskService);
        spyOn(CreateTaskService, 'getTaskReason').and.returnValues(
            Observable.throw('error from server')
        );
        component.getTaskReason()
        expect(component.errorMessage).toBeDefined();
    }));

    // it('should post form values to the service', async(() => { 
    //     let CreateTaskService = fixture.debugElement.injector.get(taskService);
    //     spyOn(CreateTaskService, 'createTask').and.callFake(data => {
    //        return Observable.from(data = [{'Form content': 'Form content'}])
    //     });
    //     component.createTask();
    //     expect(component.responseOfFormSubmitted).toEqual({'Form content': 'Form content'})
    // }));

    // it('should trow a error message if somthing went wrong during http call to submit the form ', async(() => {
    //     let CreateTaskService = fixture.debugElement.injector.get(taskService);
    //     spyOn(CreateTaskService, 'createTask').and.returnValues(
    //         Observable.throw('error from server')
    //     );
    //     component.createTask();
    //     expect(component.errorMessage).toBeDefined();
    // }));

    it('should change to Rx/Order options when source of task is selected', () => {
        component.rxIdorOrderIdChange("Order");
        let RxorOrderOptions = component.RxorOrderOptions;
        expect(RxorOrderOptions).toBe(component.ordersOptions)
    });

    it('should change the label of Rx/Order dropdown when source of task is selected', () => {
        component.rxIdorOrderIdChange("Rx");
        let rxOrderTitle = component.rxOrderTitle;
        expect(rxOrderTitle).toBe('Rx')
    });

    it('should make a object of form data', async(() => {
        component.submittedValue();
        let taskValue = component.taskValue;
        expect(taskValue).toBeDefined();
    }));

    it('should not hide the dialog box if the form is invalid on submit button click', async(() => {
        let validity = component.task.invalid;
        component.ontaskSubmit();
        let createTaskDisplay = component.createTaskDisplay
        expect(validity).toBe(createTaskDisplay)
    }));

    it('should submit the form when the form is valid on submit button click', async(() => {
        component.task.controls.sourceOfTask.setValue({ name: 'sourceOfTask', value: 'sourceOfTask'})
        component.task.controls.reason.setValue({ name: 'reason', value: 'reason' })
        component.task.controls.date.setValue(new Date())
        component.task.controls.rxOrOrders.setValue({ name: 'rxOrOrders', value: 'rxOrOrders' })
        component.task.controls.comments.setValue('some comments')
        
        let validity = component.task.valid;
        component.ontaskSubmit();
        let createTaskDisplay = component.createTaskDisplay;
        let submitFunction = component.submittedValue()
        expect(submitFunction).toHaveBeenCalled;
    }));

    // it('should make a http call to submit the form to backend on submit button click', async(() => {
    //     component.task.controls.sourceOfTask.setValue({ name: 'sourceOfTask', value: 'sourceOfTask' })
    //     component.task.controls.reason.setValue({ name: 'reason', value: 'reason' })
    //     component.task.controls.date.setValue(new Date())
    //     component.task.controls.rxOrOrders.setValue({ name: 'rxOrOrders', value: 'rxOrOrders' })
    //     component.task.controls.comments.setValue('some comments')

    //     let validity = component.task.valid;
    //     component.ontaskSubmit();
    //     let submitFunction = component.createTask()
    //     expect(submitFunction).toHaveBeenCalled;
    // }));

    it('should hide the dialog box if the form is valid on submit button click', async(() => {
        component.task.controls.sourceOfTask.setValue({ name: 'sourceOfTask', value: 'sourceOfTask' })
        component.task.controls.reason.setValue({ name: 'reason', value: 'reason' })
        component.task.controls.date.setValue(new Date())
        component.task.controls.rxOrOrders.setValue({ name: 'rxOrOrders', value: 'rxOrOrders' })
        component.task.controls.comments.setValue('some comments')

        let validity = component.task.invalid;
        component.ontaskSubmit();
        let createTaskDisplay = component.createTaskDisplay
        expect(validity).toBe(createTaskDisplay)
    }));

    it('should hide the dialog box on cancel button click', async(() => {
        component.onTaskCancel();
        let createTaskDisplay = component.createTaskDisplay
        expect(createTaskDisplay).toBe(false)
    }));

    it('should should reset the form to null values on cancel button click', async(() => {
        component.task.controls.sourceOfTask.setValue({ name: 'sourceOfTask', value: 'sourceOfTask' })
        component.task.controls.reason.setValue({ name: 'reason', value: 'reason' })
        component.task.controls.date.setValue(new Date())
        component.task.controls.rxOrOrders.setValue({ name: 'rxOrOrders', value: 'rxOrOrders' })
        component.task.controls.comments.setValue('some comments')
        let beforeCancel = component.task.value;

        component.onTaskCancel();
        let afterCancel = component.task.value
        expect(beforeCancel).not.toBe(afterCancel);
    }));

     it('should reset the form values to default values on cancel button click', async(() => {
         component.onTaskCancel();
         expect(component.defaultValues()).toHaveBeenCalled;
     }));

    it('should call all http get requests at a time', async(() => {
        component.defaultValues();

        expect(component.getTaskSource()).toHaveBeenCalled;
        expect(component.getTaskReason()).toHaveBeenCalled;
        expect(component.getOrderId()).toHaveBeenCalled;
        expect(component.getRxId()).toHaveBeenCalled;
        expect(component.RxorOrderOptions).toBeDefined;
        expect(component.rxOrderTitle).toBeDefined;
    }));

    it('should create a current date, which will be used as a validator for date', async(() => {
        component.dateValidation();
        let createTaskMinDate = component.createTaskminDate;
        expect(createTaskMinDate).toBeDefined;
    }))

    it('should create a form for create task component on ngOnINit', async(() => {
        component.ngOnInit();
        let task = component.task;

        expect(task).toBeDefined;
        expect(task.valid).toBeFalsy();
        expect(component.defaultValues()).toHaveBeenCalled;
        expect(component.dateValidation()).toHaveBeenCalled;
        
    }))



});




