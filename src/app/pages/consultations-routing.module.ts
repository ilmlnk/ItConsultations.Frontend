import { NgModule } from '@angular/core';
import { ConsultationsListPageComponent } from './consultations-list-page/consultations-list-page.component';
import { CoachesListPageComponent } from './coaches-list-page/coaches-list-page.component';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: ConsultationsListPageComponent },
  { path: 'coaches', component: CoachesListPageComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ConsultationsRoutingModule { }
