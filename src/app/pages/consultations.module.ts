import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoachesListPageComponent } from './consultations/coaches-list-page/coaches-list-page.component';
import { ConsultationsListPageComponent } from './consultations/consultations-list-page/consultations-list-page.component';
import { ConsultationsRoutingModule } from './consultations-routing.module';
import { CreateCoachPageComponent } from './consultations-administration/create-coach-page/create-coach-page.component';
import { RegisterStudentPageComponent } from './consultations-administration/register-student-page/register-student-page.component';
import { LoginComponent } from './consultations-administration/login/login.component';
import { ConsultationsPageRootComponent } from './consultations/consultations-page-root/consultations-page-root.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { SidebarComponent } from '../shared/components/sidebar/sidebar.component';
import { InputComponent } from '../shared/components/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CoachesListComponent } from './consultations/components/coaches-list/coaches-list.component';
import { ConsultationsListComponent } from './consultations/components/consultations-list/consultations-list.component';
import { ConsultationCardComponent } from './consultations/components/consultations-list/consultation-card/consultation-card.component';
import { ModalWindowComponent } from './consultations/components/modal-window/modal-window.component';
import { ConsultationModalComponent } from './consultations/components/consultations-list/consultation-card/consultation-modal/consultation-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConsultationTimeModalComponent } from './consultations/components/consultations-list/consultation-card/consultation-modal/consultation-time-modal/consultation-time-modal.component';
import { SelectedOptionsComponent } from './consultations/components/consultations-list/consultation-card/consultation-modal/selected-options/selected-options.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatError, MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    CoachesListPageComponent,
    ConsultationsListPageComponent,
    CreateCoachPageComponent,
    RegisterStudentPageComponent,
    LoginComponent,
    ConsultationsPageRootComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    InputComponent,
    CoachesListComponent,
    ConsultationsListComponent,
    ConsultationCardComponent,
    ModalWindowComponent,
    ConsultationModalComponent,
    ConsultationTimeModalComponent,
    SelectedOptionsComponent,
    SelectedOptionsComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ConsultationsRoutingModule,
    ReactiveFormsModule,
    ButtonsModule.forRoot(),
    MatDialogModule,
    MatChipsModule,
    MatFormField,
    MatLabel,
    MatOptionModule,
    MatError,
    MatHint,
    MatSelectModule,
  ],
  exports: [
    MatDialogModule,
    MatChipsModule
  ],
  providers: [
    
  ]
})
export class ConsultationsModule { }
