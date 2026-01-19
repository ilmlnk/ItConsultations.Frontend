import {Component, inject} from '@angular/core';
import {
  faGoogle,
  faFacebook,
  faAmazon,
  faMicrosoft,
  faAirbnb
} from '@fortawesome/free-brands-svg-icons';
import {LandingContentService} from '../../../shared/services/content/landing-content.service';

@Component({
  selector: 'cons-landing-page',
  standalone: false,

  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  scrollingCompanies: any[] = [];
  selectedIndex = 0;

  private _landingContentService = inject(LandingContentService);

  constructor() {}

  ngOnInit() {}
}
