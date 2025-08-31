import { Component, HostListener } from '@angular/core';
import { Consultation } from '../../../shared/models/consultation';
import { ConsultationsService } from '../../../shared/services/consultations/consultations.service';
import { Language } from '../../../shared/enums/language.enum';

@Component({
  selector: 'cons-consultations-list-page',
  standalone: false,
  templateUrl: './consultations-list-page.component.html',
  styleUrl: './consultations-list-page.component.scss',
})
export class ConsultationsListPageComponent {
  isBookingModalOpen: boolean = false;
  selectedConsultation!: Consultation;

  consultations: Consultation[] = [
    {
      id: 1,
      consId: '123465789',
      title: 'Example',
      description: 'Example',
      price: 150,
      currency: 'USD',
      thumbnailUrl: 'https://example.com',
      coachImageUrl: 'https://example.com',
      duration: 50,
      isFavorite: true,
      coach: {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        description: 'Experienced business coach',
        position: 'Senior Coach',
        imageUrl: 'https://example.com/image.jpg',
        companyName: 'Coaching Inc',
        languages: [Language.EN],
        reviews: [
          {
            id: 1,
            rating: 4.2,
            comment: 'Example',
          },
        ],
        topics: ['Composition', 'OOP', 'Architecture', 'Aggregation'],
        skills: ['Java', 'JPA', 'Spring'],
      },
    },
    {
      id: 2,
      consId: '1234657888',
      title: 'Example',
      description: 'Example',
      price: 150,
      thumbnailUrl: 'https://example.com',
      coachImageUrl: 'https://example.com',
      duration: 50,
      currency: 'USD',
      isFavorite: false,
      coach: {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        description: 'Experienced business coach',
        position: 'Senior Coach',
        imageUrl: 'https://example.com/image.jpg',
        companyName: 'Coaching Inc',
        languages: [Language.DE],
        reviews: [
          {
            id: 2,
            rating: 4.5,
            comment: 'Example',
          },
          {
            id: 2,
            rating: 3,
            comment: 'Example',
          },
        ],
        topics: ['Composition', 'OOP', 'Architecture', 'Aggregation'],
        skills: ['Java', 'JPA', 'Spring'],
      },
    },
    {
      id: 2,
      consId: '12346578874',
      title: 'Example',
      description: 'Example',
      price: 200,
      currency: 'USD',
      thumbnailUrl: 'https://example.com',
      coachImageUrl: 'https://example.com',
      duration: 50,
      isFavorite: false,
      coach: {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        description: 'Experienced business coach',
        position: 'Senior Coach',
        imageUrl: 'https://example.com/image.jpg',
        companyName: 'Coaching Inc',
        languages: [Language.IT],
        reviews: [
          {
            id: 2,
            rating: 4.5,
            comment: 'Example',
          },
          {
            id: 2,
            rating: 3,
            comment: 'Example',
          },
          {
            id: 3,
            rating: 2,
            comment: 'Example',
          },
        ],
        topics: ['Composition', 'OOP', 'Architecture', 'Aggregation'],
        skills: ['Java', 'JPA', 'Spring'],
      },
    },
  ];

  constructor(private _consultationService: ConsultationsService) {}

  ngOnInit() {
    this._consultationService
      .getConsultations()
      .subscribe((consultations: Consultation[]) => {
        this.consultations = consultations;
      });
  }

  ngOnDestroy() {
    this.enableBodyScroll();
  }

  onOpenBookingModal(consultation: Consultation) {
    this.selectedConsultation = consultation;
    this.isBookingModalOpen = true;
    
    this.disableBodyScroll();
  }

  onCloseBookingModal() {
    this.isBookingModalOpen = false;
    
    this.enableBodyScroll();
  }

  private disableBodyScroll() {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.classList.add('modal-open');
    document.body.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
  }

  private enableBodyScroll() {
    document.body.classList.remove('modal-open');
    document.body.style.removeProperty('--scrollbar-width');
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent) {
    if (this.isBookingModalOpen) {
      this.onCloseBookingModal();
    }
  }
}
