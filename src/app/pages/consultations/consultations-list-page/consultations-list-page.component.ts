import { Component } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { Consultation } from '../../../shared/models/consultation';
import { ConsultationsService } from '../../../shared/services/consultations.service';

@Component({
  selector: 'cons-consultations-list-page',
  standalone: false,
  templateUrl: './consultations-list-page.component.html',
  styleUrl: './consultations-list-page.component.scss'
})
export class ConsultationsListPageComponent {
  myForm?: UntypedFormGroup;
  consultations: Consultation[] = [
    {
      id: 1,
      title: "Career Development Strategy Session",
      description: "One-on-one consultation focused on creating a personalized career development plan.",
      price: 150,
      thumbnailUrl: "https://example.com/consultation1-thumb.jpg",
      coachImageUrl: "https://example.com/coach1-profile.jpg",
      duration: 60,
      coach: {
        id: 101,
        firstName: "Michael",
        lastName: "Thompson",
        description: "Experienced career coach with 15+ years in professional development.",
        position: "Senior Career Coach",
        imageUrl: "https://example.com/coach1-profile.jpg",
        username: "m.thompson",
        password: "securePassword123",
        companyName: "Career Excellence Ltd",
        languages: []
      }
    },
    {
      id: 2,
      title: "Leadership Skills Assessment",
      description: "Comprehensive evaluation of your leadership capabilities with actionable feedback.",
      price: 200,
      thumbnailUrl: "https://example.com/consultation2-thumb.jpg",
      coachImageUrl: "https://example.com/coach2-profile.jpg",
      duration: 90,
      coach: {
        id: 102,
        firstName: "Sarah",
        lastName: "Johnson",
        description: "Leadership development expert with executive coaching experience.",
        position: "Executive Leadership Coach",
        imageUrl: "https://example.com/coach2-profile.jpg",
        username: "s.johnson",
        password: "securePassword456",
        companyName: "Leadership Masters",
        languages: []
      }
    },
  ];

  constructor(private formBuilder: UntypedFormBuilder,
    private _consultationService: ConsultationsService
  ) { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      radio: ['list']
    });

    this._consultationService.getConsultations()
      .subscribe((consultations: Consultation[]) => {
        this.consultations = consultations;
      })
  }

  get radioButtonState(): boolean {
    return this.myForm?.value.radio === 'list' ? true : false;
  }
}
