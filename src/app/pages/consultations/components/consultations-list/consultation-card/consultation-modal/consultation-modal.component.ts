import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConsultationTimeModalComponent } from './consultation-time-modal/consultation-time-modal.component';

@Component({
  selector: 'cons-consultation-modal',
  standalone: false,
  
  templateUrl: './consultation-modal.component.html',
  styleUrl: './consultation-modal.component.scss'
})
export class ConsultationModalComponent {
  isConsultationTimeModalOpen = false;

  constructor(public dialog: MatDialog) {}
  
  ngOnInit() {}

  openConsultationTimeModal(): void {
    const dialogRef = this.dialog.open(ConsultationTimeModalComponent, {
      width: '500px',
      height: '300px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  closeTimeConsultationModal() {
    this.isConsultationTimeModalOpen = false;
  }
}
