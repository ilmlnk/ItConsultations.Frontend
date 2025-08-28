import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Consultation } from '../../../../../../shared/models/consultation';
import { ToasterNotificationsService } from '../../../../../../shared/services/notifications/toaster-notifications.service';

@Component({
  selector: 'cons-consultation-modal',
  standalone: false,
  
  templateUrl: './consultation-modal.component.html',
  styleUrl: './consultation-modal.component.scss'
})
export class ConsultationModalComponent {
  @Input() model: Consultation;
  @Input() isOpen: boolean = false;

  @Output() close = new EventEmitter<void>();
  @Output() bookConsultationSubmit = new EventEmitter();

  isLoading: boolean = false;
  consultationForm!: FormGroup;

  constructor(
    public notificationService: ToasterNotificationsService,
    private fb: FormBuilder
  ) {}
  
  ngOnInit() {
    this.initForm();
  }

  ngOnDestroy() {
    document.body.style.overflow = 'auto';
  }

  onClose() {
    this.isOpen = false;
    this.resetForm();
  }

  onModalOpen() {
    this.isOpen = true;
    document.body.style.overflow = 'hidden';
  }

  onModalClick(event: Event) {
    event.stopPropagation();
  }

  onOverlayClick() {
    this.onClose();
  }

  onSubmit() {
    if (this.consultationForm.valid) {
      this.isLoading = true;
      const formData = {
        ...this.consultationForm.value,
        consultationId: this.model.id
      };

      this.bookConsultationSubmit.emit();
      this.isLoading = false;
      this.notificationService.showSuccess(
        'Consultations.Sucess',
        'Consultations.SuccessMessage'
      );
      this.onClose();
    } else {
      this.markFormGroupTouched();
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

  get coachFullName() {
    return `${this.model.coach.firstName} ${this.model.coach.lastName}`; 
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
}
