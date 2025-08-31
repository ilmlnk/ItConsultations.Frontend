import { ApplicationRef, Component, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, EventEmitter, Injector, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Consultation } from '../../../../../../shared/models/consultation';
import { ToasterNotificationsService } from '../../../../../../shared/services/notifications/toaster-notifications.service';
import { ModalWindowComponent } from '../../../../../../shared/components/modal-window/modal-window.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ConsultationsService } from '../../../../../../shared/services/consultations/consultations.service';

@Component({
  selector: 'cons-consultation-modal',
  standalone: false,

  templateUrl: './consultation-modal.component.html',
  styleUrl: './consultation-modal.component.scss',
  animations: [
    trigger('modalAnimation', [
      state('void', style({
        opacity: 0,
        transform: 'scale(0.8) translateY(-20px)'
      })),
      state('*', style({
        opacity: 1,
        transform: 'scale(1) translateY(0)'
      })),
      
      transition('void => *', [
        animate('300ms cubic-bezier(0.35, 0, 0.25, 1)')
      ]),
      transition('* => void', [
        animate('200ms cubic-bezier(0.35, 0, 0.25, 1)')
      ])
    ])
  ]
})
export class ConsultationModalComponent extends ModalWindowComponent implements OnInit, OnDestroy {
  @Input() model!: Consultation;
  @Output() bookConsultationSubmit = new EventEmitter<any>();

  consultationForm!: FormGroup;
  competencies: string[] = [];

  constructor(
    public notificationService: ToasterNotificationsService,
    private _consultationService: ConsultationsService,
    private fb: FormBuilder
  ) {
    super();
  }

  override ngOnInit() {
    super.ngOnInit();
    this.initForm();
    this.competencies = [...this.model.coach.topics, ...this.model.coach.skills];
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
  }

  protected override initializeModal(): void {}

  protected override cleanupModal(): void {
    if (this.consultationForm) {
      this.consultationForm.reset();
    }
  }

  protected override onModalOpen(): void {
    super.onModalOpen();
    this.resetFormErrors();
  }
  
  protected override onModalClose(): void {
    super.onModalClose();
    this.resetForm();
  }

  protected override canCloseOnOverlayClick(): boolean {
    return !this.isFormDirty();
  }

  protected override canCloseOnEscape(): boolean {
    return !this.isLoading;
  }

  public onSubmit(): void {
    if (this.consultationForm.valid) {
      this.setLoading(true);

      const formData = {
        ...this.consultationForm.value,
        consultationId: this.model.id
      };

      this.bookConsultationSubmit.emit(formData);
      this.setLoading(false);

      this.notificationService.showSuccess(
        'Consultations.Success',
        'Consultations.SuccessMessage'
      );

      this.hideWindow();
    } else {
      this.markFormGroupTouched();
    }
  }

  public onClose(): void {
    if (this.canCloseModal()) {
      this.close.emit();
      this.hideWindow();
    }
  }

  isFieldInvalid(fieldName: string) {
    const field = this.consultationForm.get(fieldName);
    return !!(field?.invalid && (field?.dirty || field?.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.consultationForm.get(fieldName);
    if (field?.errors?.['required']) return `${fieldName} is required`;
    if (field?.errors?.['email']) return 'Invalid email format';
    return '';
  }

  sendRequest() {
    
  }

  get coachFullName() {
    return `${this.model.coach.firstName} ${this.model.coach.lastName}`;
  }

  get competenciesList(): string[] {
    return this.competencies;
  }

  private resetForm() {
    this.consultationForm.reset();
  }

  private initForm() {
    this.consultationForm = this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      comment: ['']
    });
  }

  private markFormGroupTouched() {
    Object.keys(this.consultationForm.controls).forEach(key => {
      const control = this.consultationForm.get(key);
      control?.markAsTouched();
    });
  }

  private resetFormErrors(): void {
    if (this.consultationForm) {
      Object.keys(this.consultationForm.controls).forEach(key => {
        this.consultationForm.get(key)?.setErrors(null);
        this.consultationForm.get(key)?.markAsUntouched();
        this.consultationForm.get(key)?.markAsPristine();
      });
    }
  }

  private isFormDirty(): boolean {
    return this.consultationForm?.dirty;
  }

  private canCloseModal(): boolean {
    if (this.isLoading) {
      return false;
    }
    
    if (this.isFormDirty()) {
      return confirm('You have unsaved changes. Are you sure you want to close?');
    }
    
    return true;
  }
}
