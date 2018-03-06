import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { GrowlModule } from 'primeng/growl';

import { taskService } from './services/task.service';
import { HttpClientModule } from '@angular/common/http';

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
    DropdownModule,
    InputMaskModule,
    HttpClientModule,
    GrowlModule 
  ],
  exports: [
    ReactiveFormsModule,
    HttpModule,
    CalendarModule,
    CheckboxModule,
    DialogModule,
    DropdownModule,
    InputMaskModule,
    HttpClientModule,
    GrowlModule 
  ],
  entryComponents: [
],

  providers: [
    taskService
  ]
})
export class taskModule { }
