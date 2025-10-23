import { ChangeDetectionStrategy, Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'cons-validation',
  standalone: false,
  templateUrl: './cons-validation.component.html',
  styleUrl: './cons-validation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsValidationComponent {
  @Input() message: string | null = null;
  @Input() show: boolean = false;

  public isVisible: boolean = false;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['show']) {
      this.isVisible = this.show;
    }
  }

  hidePopup() {
    this.isVisible = false;
  }
}
