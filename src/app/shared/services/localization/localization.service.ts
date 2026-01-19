import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CountryCity } from '../../models/interfaces/country-city.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {
  private apiUrl = "https://countriesnow.space/api/v0.1/countries";

  constructor(private http: HttpClient) { }

  get cities(): Observable<string[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => {
        return response.data.flatMap((country: any) => country.cities);
      })
    );
  }

  get countryCityPairs(): Observable<CountryCity[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.data.map((item: any) => ({
        country: item.country,
        cities: item.cities
      })))
    )
  }
}
