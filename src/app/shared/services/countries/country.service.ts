import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Country } from '../../models/country';
import { Environment } from '../../../../environment';
import { CacheService } from '../cache/cache.service';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private _http = inject(HttpClient);
  private _cacheService = inject(CacheService);

  private _cacheKey = 'countriesList';
  private _cacheTtl = 60 * 60 * 1000;

  constructor() { }

  getCountries(): Observable<Country[]> {
    const cachedCountries = this._cacheService.get<Country[]>(this._cacheKey);

    return cachedCountries ?
      of(cachedCountries) :
      this._http.get<any[]>(Environment.countryListUrl).pipe(
        map(response => {
          return response
            .map(country => ({
              name: country.name.common,
              code: country.cca2
            }))
            .sort((a, b) => a.name.localeCompare(b.name));
        }),
        tap(countries => this._cacheService.set(this._cacheKey, countries, this._cacheTtl)),
        catchError(error => {
          return of([]);
        })
      );
  }
}
