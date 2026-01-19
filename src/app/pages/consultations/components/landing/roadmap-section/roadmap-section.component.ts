import { Component, inject } from '@angular/core';
import { LandingContentService } from '../../../../../shared/services/content/landing-content.service';

@Component({
  selector: 'cons-roadmap-section',
  standalone: false,
  templateUrl: './roadmap-section.component.html',
  styleUrl: './roadmap-section.component.scss'
})
export class RoadmapSectionComponent {
  steps: any = [];

  private _landingContentService = inject(LandingContentService);

  ngOnInit() {
    this._landingContentService.roadmap.subscribe(data => this.steps = data);
  }
}
