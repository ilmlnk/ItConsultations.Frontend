import { Component, inject } from '@angular/core';
import { HeaderTitleService } from '../../services/header-title/header-title.service';

@Component({
  selector: 'cons-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private _headerTitleService = inject(HeaderTitleService);
  pageTitle$ = this._headerTitleService.title$;
}
