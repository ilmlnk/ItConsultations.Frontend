import { Component, Input } from '@angular/core';
import { Consultation } from '../../../../shared/models/consultation';
import { ConsultationsService } from '../../../../shared/services/consultations/consultations.service';
import { ToasterNotificationsService } from '../../../../shared/services/notifications/toaster-notifications.service';
import { ViewMode } from '../../../../shared/enums/view-mode.enum';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Coach } from '../../../../shared/models/coach';

@Component({
  selector: 'cons-consultations-list',
  standalone: false,
  templateUrl: './consultations-list.component.html',
  styleUrl: './consultations-list.component.scss',
})
export class ConsultationsListComponent {
  @Input() consultations: Consultation[];

  filteredConsultations: Consultation[] = [];
  availableCoaches: Coach[] = [];
  filtersForm: FormGroup;
  viewMode: ViewMode;
  showFiltersPanel: boolean = false;
  availableCategories: string[] = [];

  constructor(
    private _consultationsService: ConsultationsService,
    private _toasterNotificationsService: ToasterNotificationsService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.viewMode = ViewMode.Detailed;
    this.initList();
    this.initViewMode();
    this.initializeFiltersForm();
  }

  setDetailedView() {

  }

  setCompactView() {

  }

  toggleViewMode() {

  }

  onCategoryChange(event: Event, category: string) {

  }

  onCoachChange(event: Event, coach: Coach) {

  }

  toggleSortOrder() {

  }

  resetFilters() {

  }

  toggleFiltersPanel() {
    this.showFiltersPanel = !this.showFiltersPanel;
  }

  isDetailedView(): boolean {
    return this.viewMode === ViewMode.Detailed;
  }

  isCompactView(): boolean {
    return this.viewMode === ViewMode.Compact;
  }

  private initList() {

  }

  private initViewMode() {
    const savedViewMode = localStorage.getItem('consultationsViewMode');
    this.viewMode = savedViewMode ? ViewMode[savedViewMode as keyof typeof ViewMode] : ViewMode.Detailed;
  }

  private initializeFiltersForm() {
    this.filtersForm = this.fb.group({
      searchQuery: [''],
      priceMin: [null],
      priceMax: [null],
      duration: [[]],
      category: [[]],
      coach: [[]],
      rating: [null],
      availability: ['all'],
      sortBy: ['date'],
      sortOrder: ['desc']
    });
  }
}
