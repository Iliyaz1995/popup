import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';

import { taskService } from './services/task.service';


@NgModule({
  declarations: [
],
  imports: [
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpModule,
    CalendarModule,
    CheckboxModule,
    DialogModule,
    DropdownModule

  ],
  exports: [
    ReactiveFormsModule,
    HttpModule,
    CalendarModule,
    CheckboxModule,
    DialogModule,
    DropdownModule
  ],
  entryComponents: [
],

  providers: [
    taskService
  ]
})
export class taskModule { }
