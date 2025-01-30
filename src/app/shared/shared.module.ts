import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultationsService } from './services/consultations/consultations.service';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule
  ],
  exports: [],
  providers: [
    ConsultationsService,
    HttpClient
  ]
})
export class SharedModule { }
