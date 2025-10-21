import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, shareReplay } from 'rxjs';
import { Country } from '../../models/country';
import { Environment } from '../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private _http = inject(HttpClient);

  private countries$: Observable<Country[]> | undefined;

  constructor() { }

  getCountries(): Observable<Country[]> {
    if (!this.countries$) {
      this.countries$ = this._http.get<any[]>(Environment.countryListUrl).pipe(
        map(response => {
          return response
            .map(country => ({
              name: country.name.common,
              code: country.cca2
            }))
            .sort((a, b) => a.name.localeCompare(b.name));
        }),
        shareReplay(1),
        catchError(error => {
          return of([]);
        })
      );
    }

    return this.countries$;
  }
}
