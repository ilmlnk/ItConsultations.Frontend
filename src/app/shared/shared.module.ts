import { NgModule } from '@angular/core';
import { ConsultationsService } from './services/consultations/consultations.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatListModule } from '@angular/material/list';

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
  ],
  exports: [],
  providers: [
    ConsultationsService,
  ]
})
export class SharedModule { }
