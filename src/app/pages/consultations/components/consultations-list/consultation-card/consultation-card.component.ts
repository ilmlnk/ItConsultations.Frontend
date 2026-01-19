import { Component, Input, Output } from '@angular/core';
import { Consultation } from '../../../../../shared/models/model/consultation.model';
import { EventEmitter } from '@angular/core';
import { ConsultationsService } from '../../../../../shared/services/consultations/consultations.service';

@Component({
  selector: 'cons-consultation-card',
  standalone: false,
  templateUrl: './consultation-card.component.html',
  styleUrl: './consultation-card.component.scss'
})
export class ConsultationCardComponent {
  @Input() model!: Consultation;

  @Output() openBookingModal = new EventEmitter<Consultation>();
  @Output() bookingRequested = new EventEmitter<any>();

  constructor(private _consultationService: ConsultationsService) {}

  ngOnInit() {
    this.loadFavoriteStatus();
  }

  openBookingConsultation() {
    this.openBookingModal.emit(this.model);
  }

  get coachFullName(): string {
    return `${this.model.coach.firstName} ${this.model.coach.lastName}`;
  }

  get coachRating() {
    if (!this.model.coach.reviews) { 
      return 0;
    }

    const total = this.model.coach.reviews?.reduce((sum, review) => sum + review.rating, 0);
    return (total / this.model.coach.reviews.length).toFixed(2);
  }

  get coachReviewsCount() {
    return this.model.coach.reviews?.length;
  }

  private loadFavoriteStatus() {
    this._consultationService.getFavoriteStatus(this.model.consId)
      .subscribe(status => this.model.isFavorite = status);
  }
}
