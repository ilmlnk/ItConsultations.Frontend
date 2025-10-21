import { Component, inject } from '@angular/core';
import { LocalizationService } from '../../../shared/services/localization/localization.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, map, shareReplay, startWith } from 'rxjs/operators';
import { Observable, of, Subscription } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { filter, tap, switchMap } from 'rxjs/operators';
import { ToasterNotificationsService } from '../../../shared/services/notifications/toaster-notifications.service';
import { Country } from '../../../shared/models/country';
import { HttpClient } from '@angular/common/http';
import { CountryService } from '../../../shared/services/countries/country.service';

@Component({
  selector: 'cons-register-page',
  standalone: false,
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterStudentPageComponent {
  registrationForm!: FormGroup;
  isLoading: boolean = false;
  selectedFile: File | null;
  previewUrl: string | ArrayBuffer | null;
  filteredCountries: Country[] = [];
  allCountries: Country[] = [];
  countryInput: string = '';

  private _localizationService = inject(LocalizationService);
  private _toasterNotificationService = inject(ToasterNotificationsService);
  private _http = inject(HttpClient);
  private _countryService = inject(CountryService);

  private countries$: Subscription;

  constructor(private fb: FormBuilder) {}

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

  onCountrySelected(country: Country) {
    this.registrationForm.controls['country'].setValue(country.name);
    this.filteredCountries = [country];
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.registrationForm.get(controlName);
    return control?.hasError(errorName) && control.touched ? true : false;
  }

  displayCountry(country: Country): string {
    return country ? country.name : '';
  }

  private filterCountries(countries: Country[], value: string): Country[] {
    const filterValue = value.toLowerCase();
    return countries.filter(country => 
      country.name.toLowerCase().includes(filterValue)
    );
  }

  private initForm() {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: '',
      country: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username : ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
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
