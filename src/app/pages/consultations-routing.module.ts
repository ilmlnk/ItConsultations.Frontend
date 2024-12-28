import { NgModule } from '@angular/core';
import { ConsultationsListPageComponent } from './consultations/consultations-list-page/consultations-list-page.component';
import { CoachesListPageComponent } from './consultations/coaches-list-page/coaches-list-page.component';
import { RouterModule, Routes } from '@angular/router';
import { ConsultationsPageRootComponent } from './consultations/consultations-page-root/consultations-page-root.component';

const routes: Routes = [
  { path: '', component: ConsultationsPageRootComponent, children: [
    { path: 'consultations-list', component: ConsultationsListPageComponent },
    { path: 'coaches', component: CoachesListPageComponent },
    { path: 'students', component: CoachesListPageComponent },
    { path: 'calendar', component: CoachesListPageComponent },
  ]}
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
