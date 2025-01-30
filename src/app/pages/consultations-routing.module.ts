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
import { StudentsListPageComponent } from './consultations/students-list-page/students-list-page.component';
import { CalendarPageComponent } from './consultations/calendar-page/calendar-page.component';
import { AchievementsPageComponent } from './consultations/achievements-page/achievements-page.component';
import { NetworkPageComponent } from './consultations/network-page/network-page.component';
import { MessengerPageComponent } from './consultations/messenger-page/messenger-page.component';
import { MeetingsPageComponent } from './consultations/meetings-page/meetings-page.component';
import { ForumPageComponent } from './consultations/forum-page/forum-page.component';
import { IndividualLessonsPageComponent } from './consultations/individual-lessons-page/individual-lessons-page.component';
import { HandbookPageComponent } from './consultations/handbook-page/handbook-page.component';

const routes: Routes = [
  {
    path: '', component: ConsultationsPageRootComponent, children: [
      { path: 'consultations-list', component: ConsultationsListPageComponent },
      { path: 'favorites', component: FavoritesConsultationsPageComponent },
      { path: 'recordings', component: MeetingRecordingsPageComponent },
      { path: 'notes', component: NotesPageComponent },
      { path: 'coaches', component: CoachesListPageComponent },
      { path: 'students', component: StudentsListPageComponent },
      { path: 'calendar', component: CalendarPageComponent },
      { path: 'achievements', component: AchievementsPageComponent },
      { path: 'network', component: NetworkPageComponent },
      { path: 'messenger', component: MessengerPageComponent },
      { path: 'meetings', component: MeetingsPageComponent },
      { path: 'forum', component: ForumPageComponent },
      { path: 'individual-lessons', component: IndividualLessonsPageComponent },
      { path: 'handbook', component: HandbookPageComponent }
    ]
  },
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
