import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'cons-hero-section',
  standalone: false,

  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent {
  @ViewChild('heroRef') heroContainerRef!: ElementRef;

  spotX = 0;
  spotY = 0;
  showSpot = false;
  private readonly spotSize = 250;


  constructor(private renderer: Renderer2) { }

  onMouseMove(e: MouseEvent): void {
    const element = e.currentTarget as HTMLElement;
    const rect = element.getBoundingClientRect();

    // 1. Рахуємо координати всередині блоку
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // 2. Центруємо коло: (Координата миші) - (Половина розміру кола)
    this.spotX = mouseX - (this.spotSize / 2);
    this.spotY = mouseY - (this.spotSize / 2);
  }
}
