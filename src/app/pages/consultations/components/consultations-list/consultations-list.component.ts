import { Component, Input } from '@angular/core';
import { Consultation } from '../../../../shared/models/consultation';
import { ConsultationsService } from '../../../../shared/services/consultations/consultations.service';
import { ToasterNotificationsService } from '../../../../shared/services/notifications/toaster-notifications.service';

@Component({
  selector: 'cons-consultations-list',
  standalone: false,
  templateUrl: './consultations-list.component.html',
  styleUrl: './consultations-list.component.scss',
})
export class ConsultationsListComponent {
  @Input() consultations: Consultation[];

  constructor(
    private _consultationsService: ConsultationsService,
    private _toasterNotificationsService: ToasterNotificationsService
  ) {}

  ngOnInit() {
    this.initList();
  }

  triggerToaster() {
    this._toasterNotificationsService.showSuccess('Example', 'exampleexample');
    this._toasterNotificationsService.showError('Error', 'errorExample');
    this._toasterNotificationsService.showInfo('Warning', 'warningExample');
  }

  private initList() {
    this._consultationsService
      .getConsultations()
      .subscribe((consultations: Consultation[]) => {
        this.consultations = consultations;
      });
  }
}
