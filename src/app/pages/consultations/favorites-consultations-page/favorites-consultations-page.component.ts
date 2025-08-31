import { Component } from '@angular/core';
import { Consultation } from '../../../shared/models/consultation';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'cons-favorites-consultations-page',
  standalone: false,
  
  templateUrl: './favorites-consultations-page.component.html',
  styleUrl: './favorites-consultations-page.component.scss'
})
export class FavoritesConsultationsPageComponent {
  consultations: Consultation[];
  filtersForm: FormGroup;

  onOpenBookingModal(consultation: Consultation) {

  }
}
