import { Injectable } from '@angular/core';
import { Consultation } from '../../models/model/consultation.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsultationsService {
  private readonly _urlGet = '/api/consultations';
  private readonly _urlPost = '/api/consultations';
  private readonly _urlPut = '/api/consultations';
  private readonly _urlDelete = '/api/consultations';

  private apiUrl = 'localhost:4201/api/consultations'
  constructor(
    protected http: HttpClient
  ) { }

  getConsultations(): Observable<Consultation[]> {
    return new Observable<Consultation[]>();
    // return this.http.get<Consultation[]>(`${this.apiUrl}`);
  }

  createConsultation(consultation: Consultation, coachConsId: string): Observable<Consultation> {
    return this.http.post<Consultation>(
      `${this.apiUrl}/${coachConsId}`, consultation
    )
      .pipe(
        
      );
  }

  openConsultation(): Observable<Consultation> {
    return new Observable<Consultation>();
  }

  getRecentConsultations(userId: string): Observable<Consultation[]> {
    return new Observable<Consultation[]>();
    // return this.http.get<Consultation[]>(`${this.apiUrl}/recent/${userId}`)
  }

  getFavoriteStatus(consId: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/favorite/${consId}`);
  }
}
