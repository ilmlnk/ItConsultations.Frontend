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
import { LandingPageComponent } from './consultations/landing-page/landing-page.component';
import { LoginComponent } from './consultations-administration/login/login.component';
import { authGuard } from '../shared/guards/auth.guard';
import { AuthRootComponent } from './consultations-administration/auth-root/auth-root.component';
import { ApplyFormComponent } from './consultations-administration/apply-form/apply-form.component';
import { CoachDashboardPageComponent } from './consultations/coach-dashboard-page/coach-dashboard-page.component';
import { AdminDashboardPageComponent } from './consultations/admin-dashboard-page/admin-dashboard-page.component';
import { StudentDashboardPageComponent } from './consultations/dashboard-page/student-dashboard-page.component';
import { guestGuard } from '../shared/guards/guest.guard';

const routes: Routes = [
  {
    path: 'dashboard', component: ConsultationsPageRootComponent, children: [
      {
        path: '',
        component: StudentDashboardPageComponent,
        canActivate: [authGuard],
        data: { title: 'Dashboard' }
      },
      {
        path: 'admin',
        component: AdminDashboardPageComponent,
        canActivate: [authGuard],
        data: { title: 'Dashboard' }
      },
      {
        path: 'coach',
        component: CoachDashboardPageComponent,
        canActivate: [authGuard],
        data: { title: 'Dashboard' }
      },
      {
        path: 'consultations',
        component: ConsultationsListPageComponent,
        //canActivate: [authGuard],
        data: { title: 'Consultations' }
       },
      {
        path: 'favorites',
        component: FavoritesConsultationsPageComponent,
        canActivate: [authGuard],
        data: { title: 'Favorite Consultations' }
      },
      {
        path: 'recordings',
        component: MeetingRecordingsPageComponent,
        canActivate: [authGuard],
        data: { title: 'Recordings' }
      },
      {
        path: 'notes',
        component: NotesPageComponent,
        //canActivate: [authGuard],
        data: { title: 'Notes' }
      },
      {
        path: 'coaches',
        component: CoachesListPageComponent,
        //canActivate: [authGuard],
        data: { title: 'Coaches' }
      },
      {
        path: 'students',
        component: StudentsListPageComponent,
        canActivate: [authGuard],
        data: { title: 'Students' }
      },
      {
        path: 'calendar',
        component: CalendarPageComponent,
        canActivate: [authGuard],
        data: { title: 'Calendar' }
      },
      {
        path: 'achievements',
        component: AchievementsPageComponent,
        canActivate: [authGuard],
        data: { title: 'Achievements' }
      },
      {
        path: 'network',
        component: NetworkPageComponent,
        canActivate: [authGuard],
        data: { title: 'Network' }
      },
      {
        path: 'messenger',
        component: MessengerPageComponent,
        canActivate: [authGuard],
        data: { title: 'Messenger' }
      },
      {
        path: 'meetings',
        component: MeetingsPageComponent,
        canActivate: [authGuard],
        data: { title: 'Meetings' }
      },
      {
        path: 'forum',
        component: ForumPageComponent,
        canActivate: [authGuard],
        data: { title: 'Forum' }
      },
      {
        path: 'individual-lessons',
        component: IndividualLessonsPageComponent,
        canActivate: [authGuard],
        data: { title: 'Individual Lessons' }
      },
      {
        path: 'handbook',
        component: HandbookPageComponent,
        canActivate: [authGuard],
        data: { title: 'Handbook' }
      }
    ]
  },
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'auth',
    component: AuthRootComponent,
    canActivate: [guestGuard],
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterPageComponent },
      { path: 'apply', component: ApplyFormComponent }
    ]
  }
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
