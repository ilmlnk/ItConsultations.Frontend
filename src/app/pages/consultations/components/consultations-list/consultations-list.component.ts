import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Consultation } from '../../../../shared/models/model/consultation.model';
import { ConsultationsService } from '../../../../shared/services/consultations/consultations.service';
import { ToasterNotificationsService } from '../../../../shared/services/notifications/toaster-notifications.service';
import { ViewMode } from '../../../../shared/enums/view-mode.enum';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Coach } from '../../../../shared/models/model/coach.model';

interface TopicSkill {
  value: string;
  label: string;
  selected: boolean;
}

@Component({
  selector: 'cons-consultations-list',
  standalone: false,
  templateUrl: './consultations-list.component.html',
  styleUrl: './consultations-list.component.scss',
})
export class ConsultationsListComponent {
  @Input() consultations: Consultation[];

  @Output() openBookingModal = new EventEmitter<Consultation>();

  @ViewChild('topicInput') topicInput!: ElementRef<HTMLInputElement>;

  filteredConsultations: Consultation[] = [];
  availableCoaches: Coach[] = [];
  filtersForm: FormGroup;
  viewMode: ViewMode = ViewMode.Detailed;
  showFiltersPanel: boolean = false;
  availableCategories: string[] = [];
  newTopicValue: string = '';
  isBookingModalOpen: boolean = false;
  selectedConsultation: Consultation;

  defaultTopics: TopicSkill[] = [
    { value: 'leadership', label: 'Leadership', selected: false },
    { value: 'communication', label: 'Communication', selected: false },
    { value: 'project-management', label: 'Project Management', selected: false },
    { value: 'teamwork', label: 'Teamwork', selected: false },
    { value: 'problem-solving', label: 'Problem Solving', selected: false },
    { value: 'time-management', label: 'Time Management', selected: false },
    { value: 'public-speaking', label: 'Public Speaking', selected: false },
    { value: 'negotiation', label: 'Negotiation', selected: false },
    { value: 'emotional-intelligence', label: 'Emotional Intelligence', selected: false },
    { value: 'decision-making', label: 'Decision Making', selected: false },
    { value: 'conflict-resolution', label: 'Conflict Resolution', selected: false },
    { value: 'mentoring', label: 'Mentoring', selected: false }
  ];
  customTopics: TopicSkill[] = [];

  constructor(
    private _consultationsService: ConsultationsService,
    private _toasterNotificationsService: ToasterNotificationsService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initList();
    this.initViewMode();
    this.initializeFiltersForm();
  }

  onOpenBookingModal(consultation: Consultation) {
    this.openBookingModal.emit(consultation);
  }

  setDetailedView() {
    if (this.viewMode !== ViewMode.Detailed) {
      this.viewMode = ViewMode.Detailed;
      localStorage.setItem('consultationsViewMode', this.viewMode.toString());
    }
  }

  setCompactView() {
    if (this.viewMode !== ViewMode.Compact) {
      this.viewMode = ViewMode.Compact;
      localStorage.setItem('consultationsViewMode', this.viewMode.toString());
    }
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

  removeCustomTopic(customTopic: TopicSkill) {

  }

  addSuggestedTopic() {

  }

  addCustomTopic() {

  }

  cancelAddingTopic() {

  }

  trackByTopic(index: number, topic: TopicSkill): string {
    return topic.value;
  }

  get addInput() {
    return true;
  }

  private initList() {

  }

  private initViewMode() {
    const savedViewMode = localStorage.getItem('consultationsViewMode');
    if (this.isViewMode(savedViewMode)) {
      this.viewMode = savedViewMode;
    }
  }

  private isViewMode(value: any): value is ViewMode {
    return Object.values(ViewMode).includes(value as ViewMode);
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
