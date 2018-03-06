import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { taskComponent} from './components/popup/task.component';
import { taskModule } from './components/popup/task.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';



@NgModule({
  declarations: [
    AppComponent,
    taskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    taskModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
