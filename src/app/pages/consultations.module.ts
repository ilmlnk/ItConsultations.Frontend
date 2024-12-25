import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoachesListPageComponent } from './coaches-list-page/coaches-list-page.component';
import { ConsultationsListPageComponent } from './consultations-list-page/consultations-list-page.component';
import { ConsultationsRoutingModule } from './consultations-routing.module';
import { CreateCoachPageComponent } from './create-coach-page/create-coach-page.component';
import { RegisterStudentPageComponent } from './register-student-page/register-student-page.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    CoachesListPageComponent,
    ConsultationsListPageComponent,
    CreateCoachPageComponent,
    RegisterStudentPageComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    ConsultationsRoutingModule
  ]
})
export class ConsultationsModule { }
