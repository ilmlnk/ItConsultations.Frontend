import { NgModule } from '@angular/core';
import { ConsultationsListPageComponent } from './consultations/consultations-list-page/consultations-list-page.component';
import { CoachesListPageComponent } from './consultations/coaches-list-page/coaches-list-page.component';
import { RouterModule, Routes } from '@angular/router';
import { ConsultationsPageRootComponent } from './consultations/consultations-page-root/consultations-page-root.component';
import { RegisterPageComponent } from './consultations-administration/register-page/register-page.component';
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
import { DashboardPageComponent } from './consultations/dashboard-page/dashboard-page.component';
import { LandingPageComponent } from './consultations/landing-page/landing-page.component';
import { LoginComponent } from './consultations-administration/login/login.component';
import { authGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: ConsultationsPageRootComponent, children: [
      { path: 'dashboard', component: DashboardPageComponent, canActivate: [authGuard] },
      { path: 'consultations-list', component: ConsultationsListPageComponent },
      { path: 'favorites', component: FavoritesConsultationsPageComponent, canActivate: [authGuard] },
      { path: 'recordings', component: MeetingRecordingsPageComponent, canActivate: [authGuard] },
      { path: 'notes', component: NotesPageComponent, canActivate: [authGuard] },
      { path: 'coaches', component: CoachesListPageComponent, canActivate: [authGuard] },
      { path: 'students', component: StudentsListPageComponent, canActivate: [authGuard] },
      { path: 'calendar', component: CalendarPageComponent, canActivate: [authGuard] },
      { path: 'achievements', component: AchievementsPageComponent, canActivate: [authGuard] },
      { path: 'network', component: NetworkPageComponent, canActivate: [authGuard] },
      { path: 'messenger', component: MessengerPageComponent, canActivate: [authGuard] },
      { path: 'meetings', component: MeetingsPageComponent, canActivate: [authGuard] },
      { path: 'forum', component: ForumPageComponent, canActivate: [authGuard] },
      { path: 'individual-lessons', component: IndividualLessonsPageComponent, canActivate: [authGuard] },
      { path: 'handbook', component: HandbookPageComponent, canActivate: [authGuard] }
    ]
  },
  { path: 'start', component: LandingPageComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterPageComponent },
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
