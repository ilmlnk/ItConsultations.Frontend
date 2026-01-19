import { Component } from '@angular/core';

@Component({
  selector: 'cons-partners-block',
  standalone: false,
  templateUrl: './partners-block.component.html',
  styleUrl: './partners-block.component.scss'
})
export class PartnersBlockComponent {
  scrollingCompanies: any[] = [];
  companies = [
    { name: 'Microsoft', icon: ['fab', 'microsoft'], color: '#0072C6' },
    { name: 'Google', icon: ['fab', 'google'], color: '#4285F4' },
    { name: 'Amazon', icon: ['fab', 'amazon'], color: '#FF9900' },
    { name: 'Facebook', icon: ['fab', 'facebook'], color: '#1877F2' },
    { name: 'Oracle', icon: ['fab', 'oracle'], color: '#F80000' },
  ]

  ngOnInit() {
    this.scrollingCompanies = [...this.companies, ...this.companies, ...this.companies];
  }
}
