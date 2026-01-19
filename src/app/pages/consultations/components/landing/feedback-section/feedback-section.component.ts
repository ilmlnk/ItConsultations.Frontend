import { Component, inject, OnInit } from '@angular/core';
import { LandingContentService } from '../../../../../shared/services/content/landing-content.service';

@Component({
  selector: 'cons-feedback-section',
  standalone: false,
  templateUrl: './feedback-section.component.html',
  styleUrl: './feedback-section.component.scss'
})
export class FeedbackSectionComponent implements OnInit {
  messages: any[] = [];

  private _landingContentService = inject(LandingContentService);

  ngOnInit() {
    this._landingContentService.feedbacks.subscribe(data => this.messages = data);
  }
}