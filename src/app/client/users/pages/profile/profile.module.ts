import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProfileRoutingModule} from './profile-routing.module';
import {NavbarComponent} from '../../navbar/navbar.component';


import {FormsModule} from "@angular/forms";
import {FooterComponent} from '../../footer/footer.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {ProfileComponent} from './profile.component';


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    MatPaginatorModule,
    NavbarComponent,
    MatSelectModule,
    FooterComponent
  ]
})
export class ProfileModule {
}
