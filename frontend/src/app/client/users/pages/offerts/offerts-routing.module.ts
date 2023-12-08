import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OffertsComponent} from "./offerts.component";


const routes: Routes = [
  {path: 'offers/:id', component: OffertsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffertsRoutingModule {
}
