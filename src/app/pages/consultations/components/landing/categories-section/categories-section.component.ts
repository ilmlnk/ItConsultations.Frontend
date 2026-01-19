import { Component, inject } from '@angular/core';
import { LandingContentService } from '../../../../../shared/services/content/landing-content.service';

@Component({
  selector: 'cons-categories-section',
  standalone: false,
  templateUrl: './categories-section.component.html',
  styleUrl: './categories-section.component.scss'
})
export class CategoriesSectionComponent {
  topCategories: any[] = [];
  techStack: any[] = [];

  private _landingContentService = inject(LandingContentService);

  constructor() {}

    ngOnInit() {
      this._landingContentService.categories.subscribe(categories => {
          this.topCategories = categories;
      });
      /*this._landingContentService.subscribe(stack => {
          this.techStack = stack;
      });*/
    }
}
