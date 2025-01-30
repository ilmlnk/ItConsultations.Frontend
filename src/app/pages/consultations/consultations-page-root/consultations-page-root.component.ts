import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'cons-consultations-page-root',
  standalone: false,
  templateUrl: './consultations-page-root.component.html',
  styleUrl: './consultations-page-root.component.scss'
})
export class ConsultationsPageRootComponent {
  constructor(private router: Router) {}
  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
} 
