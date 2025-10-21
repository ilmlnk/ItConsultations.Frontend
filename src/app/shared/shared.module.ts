import { NgModule } from '@angular/core';
import { ConsultationsService } from './services/consultations/consultations.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatListModule } from '@angular/material/list';
import { ToasterNotificationsService } from './services/notifications/toaster-notifications.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ModalService } from './services/modal/modal.service';
import { AuthService } from './services/auth/auth.service';

@NgModule({
  declarations: [],
  imports: [
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatTooltipModule,
    MatMenuModule,
    MatDatepickerModule,
    MatListModule,
    BrowserAnimationsModule,
    BrowserModule
  ],
  exports: [],
  providers: [
    ConsultationsService,
    ToasterNotificationsService,
    ModalService,
    AuthService
  ]
})
export class SharedModule { }
