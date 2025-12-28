import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'cons-form-field-error',
  standalone: false,
  templateUrl: './form-field-error.component.html',
  styleUrl: './form-field-error.component.scss'
})
export class FormFieldErrorComponent {
  @Input() control: AbstractControl | null = null;
  @Input() errorKey: string = '';
  @Input() message: string = '';

  get shouldShow(): boolean {
    if (!this.control || !this.errorKey) {
      return false;
    }

    return this.control.hasError(this.errorKey) &&
        (this.control.dirty || this.control.touched);
  }
}
