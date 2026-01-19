import { Component, inject, OnInit } from '@angular/core';
import { LandingContentService } from '../../../../../shared/services/content/landing-content.service';

@Component({
  selector: 'cons-faq-section',
  standalone: false,
  templateUrl: './faq-section.component.html',
  styleUrl: './faq-section.component.scss'
})
export class FaqSectionComponent implements OnInit {
  faqs: any[] = [];
  private _landingContentService = inject(LandingContentService);

  ngOnInit() {
    this._landingContentService.faqs.subscribe(data => this.faqs = data);
  }
}