import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OffertsRoutingModule } from './offerts-routing.module';
import { OffertsComponent } from './offerts.component';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    OffertsComponent
  ],
  imports: [
    CommonModule,
    OffertsRoutingModule,
    DatePipe
  ],
  providers: []
})
export class OffertsModule { }
