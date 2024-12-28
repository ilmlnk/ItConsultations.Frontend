import { Component, Input } from '@angular/core';

@Component({
  selector: 'cons-input',
  standalone: false,
  
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  @Input() placeholderInput: string = '';
  @Input() typeInput: string = '';
  @Input() inputLabel: string = '';
  @Input() errorMessage: string = '';
  @Input() classInput: string = '';

  constructor() {}
  
  set errorMessageText(text: string) {
    this.errorMessage = text;
  }

  set classInputText(text: string) {
    this.classInput = text;
  }

  set inputLabelText(text: string) {
    this.inputLabel = text;
  }

  set placeholderText(text: string) {
    this.placeholderInput = text;
  }

  set typeText(text: string) {
    this.typeInput = text;
  }

  get errorMessageText(): string {
    return this.errorMessage;
  }

  get classInputText(): string {
    return this.classInput;
  }

  get inputLabelText(): string {
    return this.inputLabel;
  }

  get typeText(): string {
    return this.typeInput;
  }

  get placeholderText(): string {
    return this.placeholderInput;
  }
}
