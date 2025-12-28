import { Injectable, Renderer2, RendererFactory2} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private renderer: Renderer2;
  private readonly THEME_STORAGE_KEY = 'isDarkMode';
  
  private isDarkModeSubject = new BehaviorSubject<boolean>(false);
  
  public isDarkMode$: Observable<boolean> = this.isDarkModeSubject.asObservable();

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.initializeTheme();
  }

  public toggleTheme(): void {
    const currentMode = this.isDarkModeSubject.value;
    const newMode = !currentMode;
    
    this.applyTheme(newMode);
    this.saveTheme(newMode);
    this.isDarkModeSubject.next(newMode);
  }

  public setTheme(isDark: boolean): void {
    this.applyTheme(isDark);
    this.saveTheme(isDark);
    this.isDarkModeSubject.next(isDark);
  }

  public get isDarkMode(): boolean {
    return this.isDarkModeSubject.value;
  }

  public get themeLabel(): string {
    return this.isDarkMode ? 'Toggle dark mode' : 'Toggle light mode';
  }

  public get themeClass(): string {
    return this.isDarkMode ? 'dark-theme' : 'light-theme';
  }

  private applyTheme(isDark: boolean): void {
    const body = document.body;
    
    if (isDark) {
      this.renderer.addClass(body, 'dark-theme');
      this.renderer.removeClass(body, 'light-theme');
    } else {
      this.renderer.removeClass(body, 'dark-theme');
      this.renderer.addClass(body, 'light-theme');
    }
    
    this.renderer.setAttribute(body, 'data-theme', isDark ? 'dark' : 'light');
  }

  private initializeTheme(): void {
    const savedTheme = localStorage.getItem(this.THEME_STORAGE_KEY);
    const isDark = savedTheme === 'true';
      
    this.applyTheme(isDark);
    this.isDarkModeSubject.next(isDark);
  }

  private saveTheme(isDark: boolean): void {
    localStorage.setItem(this.THEME_STORAGE_KEY, isDark.toString());
  }
}
