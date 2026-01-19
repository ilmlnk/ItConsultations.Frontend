import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'cons-page-header',
  standalone: false,
  templateUrl: './dashboard-page-header.component.html',
  styleUrl: './dashboard-page-header.component.scss'
})
export class DashboardPageHeaderComponent {
  @Input() viewOptions: any[] = [];
  @Input() selectedViewOption: any;
  @Output() selectedViewOptionChange = new EventEmitter<any>();

  @Input() searchValue: string = '';
  @Output() searchValueChange = new EventEmitter<string>();

  @Input() selectedItemsCount: number = 0;
  @Input() exportMenuItems: MenuItem[] = [];

  @Output() onFilter = new EventEmitter<void>();
  @Output() onSort = new EventEmitter<void>();
}
