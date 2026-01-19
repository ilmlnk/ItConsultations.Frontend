import { Component, inject } from '@angular/core';
import { LandingContentService } from '../../../../../shared/services/content/landing-content.service';

@Component({
  selector: 'cons-use-cases-section',
  standalone: false,
  templateUrl: './use-cases-section.component.html',
  styleUrl: './use-cases-section.component.scss'
})
export class UseCasesSectionComponent {
  selectedIndex = 0;
  cases: any = [];

  private _landingContentService = inject(LandingContentService);

  ngOnInit() {
    this._landingContentService.useCases.subscribe(data => {
      this.cases = data;
    });
  }

  selectTab(index: number): void {
    this.selectedIndex = index;
  }
}
