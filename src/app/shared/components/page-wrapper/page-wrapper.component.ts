import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'cons-page-wrapper',
  standalone: false,
  templateUrl: './page-wrapper.component.html',
  styleUrl: './page-wrapper.component.scss'
})
export class PageWrapperComponent {
  @Input() title: string = '';
  
  // Header Inputs
  @Input() viewOptions: any[] = [];
  @Input() selectedViewOption: any;
  @Output() selectedViewOptionChange = new EventEmitter<any>();
  @Input() searchValue: string = '';
  @Output() searchValueChange = new EventEmitter<string>();
  @Input() selectedItemsCount: number = 0;
  @Input() exportMenuItems: MenuItem[] = [];

  // Paginator Inputs
  @Input() first: number = 0;
  @Input() rows: number = 10;
  @Input() totalRecords: number = 0;
  @Input() rowsPerPageOptions: number[] = [10, 20, 50];
  @Output() onPageChange = new EventEmitter<any>();

  onPageChangeHandler(event: any) {
    this.onPageChange.emit(event);
  }
}