import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';

import { AppComponent } from './app.component';
import { taskComponent} from './components/popup/task.component';
import { taskModule } from './components/popup/task.module';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';



@NgModule({
  declarations: [
    AppComponent,
    taskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    taskModule,
    DropdownModule,
    CheckboxModule,
    CalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
