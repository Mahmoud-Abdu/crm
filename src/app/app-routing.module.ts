import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DealsComponent } from './deals/deals.component';

const routes: Routes = [
  { path: '', component: DealsComponent },
  // { path: 'deals', component: DealsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
