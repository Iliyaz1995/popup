import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';

import { AppComponent } from './app.component';
import { PopupComponent} from './components/popup/popup.component';
import { PopupModule } from './components/popup/popup.module';



@NgModule({
  declarations: [
    AppComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    PopupModule,
    DropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
