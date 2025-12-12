import { Component, inject } from '@angular/core';
import { LocalizationService } from '../../../shared/services/localization/localization.service';
import { FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { ToasterNotificationsService } from '../../../shared/services/notifications/toaster-notifications.service';
import { Country } from '../../../shared/models/country';
import { HttpClient } from '@angular/common/http';
import { CountryService } from '../../../shared/services/countries/country.service';
import { UserRole } from '../../../shared/enums/user-role';
import { ConsultationsMapper } from '../../../shared/mappers/consultations-mapper';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { ConsultationsValidationHelper } from '../../../shared/validators/consultations-validation-helper';
import { Gender } from '../../../shared/enums/gender.enum';

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

  private _localizationService = inject(LocalizationService);
  private _toasterNotificationService = inject(ToasterNotificationsService);
  private _http = inject(HttpClient);
  private _countryService = inject(CountryService);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  private countries$: Subscription;

  constructor(private fb: FormBuilder) { }

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
    if (!this.registrationForm.valid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const formData = this.registrationForm.value;
    const registrationData = ConsultationsMapper.mapRegistrationData(formData);

    this._authService.register(registrationData).subscribe({
      next: (backendUser) => {
        this.isLoading = false;
        this._toasterNotificationService.showSuccess('Success', 'Registration successful');

        const redirectPath = registrationData.role === UserRole.Student ? '/student-dashboard' : '/coach-dashboard';
        this._router.navigate([redirectPath]);
      },
      error: (error) => {
        this.isLoading = false;
        this._toasterNotificationService.showError('Fail', 'Registration failed');
      }
    })
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.registrationForm.get(controlName);
    return !!control && control.hasError(errorName) && (control.dirty || control.touched);
  }

  displayCountry(countryOrName: Country | string): string {
    if (!countryOrName) {
      return '';
    }

    return typeof countryOrName === 'string' ? countryOrName : countryOrName.name;
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
      gender: [Gender.Male, Validators.required],
      role: [UserRole.Student, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: [
        /*ConsultationsValidationHelper.passwordMatchValidator(),
        ConsultationsValidationHelper.usernameValidator()*/
      ]
    });
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
}
