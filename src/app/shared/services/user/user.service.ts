import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private _http = inject(HttpClient);

  get dateFormat() {
    return 'dd/MM/YYYY';
  }

  get timeFormat() {
    return 'hh:mm:ss';
  }

  get culture() {
    return 'en';
  }

  get datePickerFormat() {
    return 'dd/MM/YYYY';
  }

  get timeZone() {
    return 'UTC';
  }

  get currentUser() {
    return null;
  }
}
