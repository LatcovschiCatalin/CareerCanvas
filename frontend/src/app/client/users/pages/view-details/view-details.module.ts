import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewDetailsRoutingModule } from './view-details-routing.module';
import { ViewDetailsComponent } from './view-details.component';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    ViewDetailsComponent
  ],
  imports: [
    CommonModule,
    ViewDetailsRoutingModule,
    DatePipe
  ],
  providers: []
})
export class ViewDetailsModule { }
