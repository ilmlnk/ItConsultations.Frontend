import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'cons-paginator',
  standalone: false,
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {
  @Input() first: number = 0;
  @Input() rows: number = 10;
  @Input() totalRecords: number = 0;
  @Input() rowsPerPageOptions: number[] = [10, 20, 50];

  @Output() onPageChange = new EventEmitter<any>();

  onPageChangeHandler(event: any) {
    this.onPageChange.emit(event);
  }
}