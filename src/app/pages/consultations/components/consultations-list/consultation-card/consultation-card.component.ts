import { Component, ComponentRef, Input, Output, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Consultation } from '../../../../../shared/models/consultation';
import { EventEmitter } from '@angular/core';
import { ModalWindowComponent } from '../../modal-window/modal-window.component';
import { ModalService } from '../../../../../shared/services/modal.service';
import { MatDialog } from '@angular/material/dialog';
import { ConsultationModalComponent } from './consultation-modal/consultation-modal.component';

@Component({
  selector: 'cons-consultation-card',
  standalone: false,
  templateUrl: './consultation-card.component.html',
  styleUrl: './consultation-card.component.scss'
})
export class ConsultationCardComponent {
  @ViewChild('modalContainer', { read: ViewContainerRef }) modalContainer: ViewContainerRef;
  @Input() consultation: Consultation;
  @Output() close = new EventEmitter<void>();
  isModalOpen = false;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  openModal(): void {
    const dialogRef = this.dialog.open(ConsultationModalComponent, {
      width: '600px',
      height: '500px',
      data: { consultation: this.consultation }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    })
  }

  closeModal() {
    this.isModalOpen = false;
  }

  get consultationEntity(): Consultation {
    return this.consultation;
  }
}
