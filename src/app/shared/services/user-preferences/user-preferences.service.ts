import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserPreferencesService {
  // Simulating server-side database (Single Source of Truth)
  private db: Map<string, string> = new Map();

  getPreference(key: string, defaultValue: string): Observable<string> {
    // Simulate fetching from server
    return of(this.db.get(key) || defaultValue);
  }

  setPreference(key: string, value: string): void {
    // Simulate saving to server
    this.db.set(key, value);
    console.log(`[UserPreferences] Saved ${key}: ${value}`);
  }
}