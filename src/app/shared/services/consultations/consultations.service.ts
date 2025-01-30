import { Injectable } from '@angular/core';
import { Consultation } from '../../models/consultation';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsultationsService {
  private defaultServiceUrl = 'api/consultations';
  constructor(
    protected http: HttpClient
  ) { }

  getConsultations(): Observable<Consultation[]> {
    return new Observable<Consultation[]>();
  }
}
