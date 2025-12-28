import { Component, Input } from '@angular/core';
import { Consultation } from '../../../../shared/models/consultation.model';
import { ConsultationsService } from '../../../../shared/services/consultations/consultations.service';

@Component({
  selector: 'cons-consultations-table',
  standalone: false,
  
  templateUrl: './consultations-table.component.html',
  styleUrl: './consultations-table.component.scss'
})
export class ConsultationsTableComponent {
  @Input() consultations: Consultation[] = [];

  constructor(private _consultationsService: ConsultationsService) {}

  ngOnInit() {
    
  }
}
