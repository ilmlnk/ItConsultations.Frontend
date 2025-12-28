import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coach } from '../../models/coach.model';

@Injectable({
  providedIn: 'root'
})
export class CoachesService {
  private apiUrl = '';

  constructor(private http: HttpClient) { }

  getCoaches(): Observable<Coach[]> {
    return this.http.get<Coach[]>(`${this.apiUrl}/coaches`);
  }

  getCoachById(id: string): Observable<Coach> {
    return this.http.get<Coach>(`${this.apiUrl}/coaches/${id}`);
  }
}
