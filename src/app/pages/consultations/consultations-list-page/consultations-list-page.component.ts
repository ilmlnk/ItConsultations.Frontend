import { Component } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { Consultation } from '../../../shared/models/consultation';
import { ConsultationsService } from '../../../shared/services/consultations/consultations.service';

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
      title: '',
      description: '',
      price: 0,
      thumbnailUrl: '',
      coachImageUrl: '',
      duration: 0,
      coach: {
        id: 0,
        firstName: '',
        lastName: '',
        companyName: '',
        languages: [],
        email: '',
        position: '',
        imageUrl: '',
        description: ''
      }
    },
    {
      id: 1,
      title: '',
      description: '',
      price: 0,
      thumbnailUrl: '',
      coachImageUrl: '',
      duration: 0,
      coach: {
        id: 0,
        firstName: '',
        lastName: '',
        companyName: '',
        languages: [],
        email: '',
        position: '',
        imageUrl: '',
        description: ''
      }
    }
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
