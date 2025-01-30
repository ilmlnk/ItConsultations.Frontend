import { Injectable } from '@angular/core';
import { Consultation } from '../../models/consultation';
import { Cons, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsultationsService {
  private defaultServiceUrl = 'api/consultations';
  private apiUrl = 'localhost:4201/api/consultations'
  constructor(
    protected http: HttpClient
  ) { }

  getConsultations(): Observable<Consultation[]> {
    return new Observable<Consultation[]>();
    // return this.http.get<Consultation[]>(`${this.apiUrl}`);
  }

  getRecentConsultations(userId: string): Observable<Consultation[]> {
    return new Observable<Consultation[]>();
    // return this.http.get<Consultation[]>(`${this.apiUrl}/recent/${userId}`)
  }
}
