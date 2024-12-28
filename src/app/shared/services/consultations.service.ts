import { Injectable } from '@angular/core';
import { Consultation } from '../models/consultation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultationsService {

  constructor() { }

  getConsultations(): Observable<Consultation[]> {
    return new Observable<Consultation[]>();
  }
}
