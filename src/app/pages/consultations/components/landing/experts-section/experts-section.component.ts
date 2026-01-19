import { Component, inject } from '@angular/core';
import { LandingContentService } from '../../../../../shared/services/content/landing-content.service';

@Component({
  selector: 'cons-experts-section',
  standalone: false,
  templateUrl: './experts-section.component.html',
  styleUrl: './experts-section.component.scss'
})
export class ExpertsSectionComponent {
    experts: any[] = [];
    selectedIndex = 0;

    private _landingContentService = inject(LandingContentService);

    constructor() { }

    ngOnInit() {
        this._landingContentService.experts.subscribe(data => this.experts = data);
    }

    selectExpert(index: number): void {
        this.selectedIndex = index;
    }
}
