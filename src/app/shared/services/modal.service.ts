import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private _isOpen = new BehaviorSubject<boolean>(false);
  public isOpen$ = this._isOpen.asObservable();

  constructor() { }

  open() {
    this._isOpen.next(true);
  }

  close() {
    this._isOpen.next(false);
  }
}
