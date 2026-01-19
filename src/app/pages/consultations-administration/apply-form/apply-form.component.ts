import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'cons-apply-form',
  standalone: false,
  templateUrl: './apply-form.component.html',
  styleUrl: './apply-form.component.scss'
})
export class ApplyFormComponent {
    applyForm: FormGroup;

}
