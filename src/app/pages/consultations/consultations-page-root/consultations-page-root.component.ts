import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { DarkModeService } from '../../../shared/services/dark-mode/dark-mode.service';
@Component({
  selector: 'cons-consultations-page-root',
  standalone: false,
  templateUrl: './consultations-page-root.component.html',
  styleUrl: './consultations-page-root.component.scss'
})
export class ConsultationsPageRootComponent {
  isDarkMode = false;
  
  private destroy$ = new Subject<void>();

  constructor(
    public themeService: DarkModeService,
    private router: Router,
    private renderer: Renderer2
  ) {}
  
  ngOnInit() {
    this.themeService.isDarkMode$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isDark => {
        console.log(`Application theme: ${isDark ? 'Dark' : 'Light'}`);
        
        this.updateMetaTheme(isDark);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    
    if (this.isDarkMode) {
      this.renderer.addClass(document.body, 'dark-theme');
    } else {
      this.renderer.removeClass(document.body, 'dark-theme');
    }
    
    localStorage.setItem('isDarkMode', this.isDarkMode.toString());
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  set theme(isDark: boolean) {
    this.themeService.setTheme(isDark);
  }

  get themeIcon(): string {
    return this.isDarkMode ? 'light_mode' : 'dark_mode';
  }

  private updateMetaTheme(isDark: boolean): void {
    const themeColor = isDark ? '#1a1a1a' : '#ffffff';

    let metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', themeColor);
    } else {
      metaTheme = document.createElement('meta');
      metaTheme.setAttribute('name', 'theme-color');
      metaTheme.setAttribute('content', themeColor);
      document.getElementsByTagName('head')[0].appendChild(metaTheme);
    }
  }
} 
