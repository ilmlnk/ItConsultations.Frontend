import { NgModule } from '@angular/core';
import { ConsultationsListPageComponent } from './consultations/consultations-list-page/consultations-list-page.component';
import { CoachesListPageComponent } from './consultations/coaches-list-page/coaches-list-page.component';
import { RouterModule, Routes } from '@angular/router';
import { ConsultationsPageRootComponent } from './consultations/consultations-page-root/consultations-page-root.component';
import { CreateCoachPageComponent } from './consultations-administration/create-coach-page/create-coach-page.component';
import { RegisterStudentPageComponent } from './consultations-administration/register-student-page/register-student-page.component';
import { FavoritesConsultationsPageComponent } from './consultations/favorites-consultations-page/favorites-consultations-page.component';
import { MeetingRecordingsPageComponent } from './consultations/meeting-recordings-page/meeting-recordings-page.component';
import { NotesPageComponent } from './consultations/notes-page/notes-page.component';

const routes: Routes = [
  { path: '', component: ConsultationsPageRootComponent, children: [
    { path: 'consultations-list', component: ConsultationsListPageComponent, children: [
      { path: 'favorites', component: FavoritesConsultationsPageComponent },
      { path: 'recordings', component: MeetingRecordingsPageComponent },
      { path: 'notes', component: NotesPageComponent }
    ] },
    { path: 'coaches', component: CoachesListPageComponent },
    { path: 'students', component: CoachesListPageComponent },
    { path: 'calendar', component: CoachesListPageComponent },

    //{ path: '' }
  ]},
  { path: 'create-coach', component: CreateCoachPageComponent },
  { path: 'register-student', component: RegisterStudentPageComponent },
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
