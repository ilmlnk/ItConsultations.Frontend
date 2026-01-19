import { Component, inject } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { ToasterNotificationsService } from '../../../shared/services/notifications/toaster-notifications.service';
import { Country } from '../../../shared/models/interfaces/country.interface';
import { CountryService } from '../../../shared/services/countries/country.service';
import { UserRole } from '../../../shared/enums/user-role.enum';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { RegistrationStep } from '../../../shared/models/interfaces/registration-step.interface';
import { ConsultationsValidationHelper } from '../../../shared/validators/consultations-validation-helper';
import { DarkModeService } from '../../../shared/services/dark-mode/dark-mode.service';
import {Location} from '@angular/common';

@Component({
  selector: 'cons-register-page',
  standalone: false,
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {
  registrationForm!: FormGroup;
  isLoading: boolean = false;
  selectedFile: File | null;
  previewUrl: string | ArrayBuffer | null;
  filteredCountries: Country[] = [];
  allCountries: Country[] = [];
  countryInput: string = '';
  imagePreview: string | ArrayBuffer | null = null;
  currentStepIndex: number = 0;

  steps: RegistrationStep[] = [
    {
      value: 'personal',
      label: 'Personal Info',
      icon: 'pi pi-user',
      fields: ['gender', 'firstName', 'lastName', 'email', 'github', 'linkedin', 'birthDate', 'country']
    },
    {
      value: 'security',
      label: 'Security',
      icon: 'pi pi-shield',
      fields: ['username', 'password', 'confirmPassword']
    }
  ]

  private destroy$ = new Subject<void>();

  private _toasterNotificationService = inject(ToasterNotificationsService);
  private _countryService = inject(CountryService);
  private _authService = inject(AuthService);
  private _router = inject(Router);
  private _location = inject(Location);

  private countries$: Subscription;

  constructor(
    public themeService: DarkModeService,
    private fb: FormBuilder
  ) {
    this.themeService.isDarkMode$.pipe(takeUntil(this.destroy$));
  }

  ngOnInit() {
    this.initForm();
    this.loadCountries();
  }

  ngOnDestroy() {
    this.countries$.unsubscribe();
  }

  onCountryInputChanged(value: string) {
    this.countryInput = value;
    this.filteredCountries = this.filterCountries(this.allCountries, value);
  }

  onNext() {
    if (this.validateCurrentStep()) {
      if (this.currentStepIndex < this.steps.length - 1) {
        this.currentStepIndex++;
      }
    }
  }

  onBack() {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
    }
  }

  onCountrySelected(country: Country): void {
    this.registrationForm.controls['country'].setValue(country.name);
    this.registrationForm.get('country')?.setValue(country.name, { emitEvent: false });
  }

  onFileSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;

    if (fileList && fileList[0]) {
      this.selectedFile = fileList[0];
      const reader = new FileReader();
      reader.onload = e => this.imagePreview = reader.result;
      reader.readAsDataURL(this.selectedFile);

      const prompt = document.getElementById('upload-prompt');
      const preview = document.getElementById('image-preview');
      if (prompt) {
        prompt.style.display = 'none';
      }
      if (preview) {
        preview.classList.remove('hidden');
      }
    } else {
      this.selectedFile = null;
      this.imagePreview = null;
      const prompt = document.getElementById('upload-prompt');
      const preview = document.getElementById('image-preview');
      if (prompt) {
        prompt.style.display = 'flex';
      }
      if (preview) {
        preview.classList.add('hidden');
      }
    }
  }

  onSubmit() {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this._authService.register(this.registrationForm.value).subscribe({
      next: (backendUser) => {
        this.isLoading = false;
        const redirectPath = this.registrationForm.value.role === UserRole.Student ? '/dashboard' : '/dashboard/coach';
        this._router.navigate([redirectPath]);
      },
      error: (error) => {
        this.isLoading = false;
        this._toasterNotificationService.showError('Fail', 'Registration failed');
      }
    })
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.registrationForm.get(controlName);
    return !!control && control.hasError(errorName) && (control.dirty || control.touched);
  }

  navigateToPreviousPage() {
      this._location.back();
  }

  private filterCountries(countries: Country[], value: string): Country[] {
    const filterValue = value.toLowerCase();
    return countries.filter(country =>
      country.name.toLowerCase().includes(filterValue)
    );
  }

  private initForm() {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', Validators.maxLength(50)],
      birthDate: [null],
      country: [null as string | null, Validators.required],
      gender: ['male', Validators.required],
      role: [UserRole.Student, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      github: ['', ConsultationsValidationHelper.linkValidator()],
      linkedin: ['', ConsultationsValidationHelper.linkValidator()],
      telegram: ['', ConsultationsValidationHelper.linkValidator()],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: []
    });
  }

  private validateCurrentStep() {
    const currentFields = this.currentStep.fields;
    let valid = true;

    currentFields.forEach(field => {
      const control = this.registrationForm.get(field);

      if (control && control.invalid) {
        control.markAsTouched();
        control.markAsDirty();
        valid = false;
      }
    });

    return valid;
  }

  private loadCountries() {
    this.countries$ = this._countryService.getCountries().subscribe(countries => {
      this.allCountries = countries;
      this.filteredCountries = [...this.allCountries];
    });
  }

  get isImageUploaded(): boolean {
    return false;
  }

  get currentStep(): RegistrationStep {
    return this.steps[this.currentStepIndex];
  }

  get isLastStep(): boolean {
    return this.currentStepIndex == this.steps.length - 1;
  }
}
