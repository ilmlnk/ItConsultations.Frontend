import { Component, Input } from '@angular/core';
import { Consultation } from '../../../../shared/models/consultation';
import { ConsultationsService } from '../../../../shared/services/consultations/consultations.service';

@Component({
  selector: 'cons-consultations-list',
  standalone: false,
  templateUrl: './consultations-list.component.html',
  styleUrl: './consultations-list.component.scss'
})
export class ConsultationsListComponent {
  @Input() consultations: Consultation[] = [];

  constructor(private _consultationsService: ConsultationsService) {}

  ngOnInit() {
    this._consultationsService.getConsultations()
      .subscribe((consultations: Consultation[]) => {
        this.consultations = consultations;
      });
  }
}
