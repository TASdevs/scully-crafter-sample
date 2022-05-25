import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HelpPageComponent} from './help-page/help-page.component';
import {InvestmentsComponent} from './investments/investments.component';

const routes: Routes = [
  {path: 'help', component: HelpPageComponent},
  {path: '', component: InvestmentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
