import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderTitleService {
  private titleSource = new BehaviorSubject<string>('');
  title$ = this.titleSource.asObservable();

  setTitle(title: string) {
    this.titleSource.next(title);
  }
}