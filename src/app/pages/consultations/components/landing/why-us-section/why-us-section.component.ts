import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import {FeatureCard} from '../../../../../shared/models/interfaces/features-card.interface';
import {LandingContentService} from '../../../../../shared/services/content/landing-content.service';

@Component({
  selector: 'cons-why-us-section',
  standalone: false,
  templateUrl: './why-us-section.component.html',
  styleUrl: './why-us-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WhyUsSectionComponent {

  features$!: Observable<FeatureCard[]>;

  constructor(private contentService: LandingContentService) {}

  ngOnInit() {
    this.features$ = this.contentService.features;
  }

  benefits = [
    {
      title: 'Expert Developers',
      desc: 'Top 1% talent from leading tech giants.',
      stars: [1, 2, 3, 4, 5]
    },
    {
      title: 'Personalized Consultations',
      desc: 'Tailored specifically to your project needs.',
      stars: [1, 2, 3, 4, 5]
    },
    {
      title: 'Flexible Scheduling',
      desc: 'Book slots that fit your time zone perfectly.',
      stars: [1, 2, 3, 4, 5]
    },
    {
      title: 'Affordable Pricing',
      desc: 'Premium knowledge without the agency markup.',
      stars: [1, 2, 3, 4, 5]
    },
    {
      title: 'Proven Results',
      desc: 'Over 1000+ developers helped successfully.',
      stars: [1, 2, 3, 4, 5]
    },
    {
      title: 'Satisfaction Guarantee',
      desc: 'Not happy with the session? Get a full refund or re-book for free.',
      stars: [1, 2, 3, 4, 5]
    }
  ];
}
