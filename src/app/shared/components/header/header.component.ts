import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DarkModeService } from '../../services/dark-mode/dark-mode.service';
import { Language } from '../../models/language';

@Component({
  selector: 'cons-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private destroy$ = new Subject<void>();

  notificationCount = 3;
  notifications = [];
  selectedLanguage: Language;

languages: Language[] = [
    { code: 'EN', name: 'English', countryCode: 'US' },
    { code: 'UA', name: 'Українська', countryCode: 'UA' },
    { code: 'RU', name: 'Русский', countryCode: 'RU' },
    { code: 'DE', name: 'Deutsch', countryCode: 'DE' },
    { code: 'FR', name: 'Français', countryCode: 'FR' },
    { code: 'ES', name: 'Español', countryCode: 'ES' },
    { code: 'IT', name: 'Italiano', countryCode: 'IT' },
    { code: 'PT', name: 'Português', countryCode: 'PT' },
    { code: 'PL', name: 'Polski', countryCode: 'PL' },
    { code: 'NL', name: 'Nederlands', countryCode: 'NL' },
    { code: 'SV', name: 'Svenska', countryCode: 'SE' },
    { code: 'NO', name: 'Norsk', countryCode: 'NO' },
    { code: 'DA', name: 'Dansk', countryCode: 'DK' },
    { code: 'FI', name: 'Suomi', countryCode: 'FI' },
    { code: 'CS', name: 'Čeština', countryCode: 'CZ' },
    { code: 'SK', name: 'Slovenčina', countryCode: 'SK' },
    { code: 'HU', name: 'Magyar', countryCode: 'HU' },
    { code: 'RO', name: 'Română', countryCode: 'RO' },
    { code: 'BG', name: 'Български', countryCode: 'BG' },
    { code: 'HR', name: 'Hrvatski', countryCode: 'HR' },
    { code: 'SR', name: 'Српски', countryCode: 'RS' },
    { code: 'SL', name: 'Slovenščina', countryCode: 'SI' },
    { code: 'LT', name: 'Lietuvių', countryCode: 'LT' },
    { code: 'LV', name: 'Latviešu', countryCode: 'LV' },
    { code: 'ET', name: 'Eesti', countryCode: 'EE' },
    { code: 'EL', name: 'Ελληνικά', countryCode: 'GR' },
    { code: 'TR', name: 'Türkçe', countryCode: 'TR' },
    { code: 'AR', name: 'العربية', countryCode: 'SA' },
    { code: 'HE', name: 'עברית', countryCode: 'IL' },
    { code: 'HI', name: 'हिन्दी', countryCode: 'IN' },
    { code: 'ZH', name: '中文', countryCode: 'CN' },
    { code: 'JA', name: '日本語', countryCode: 'JP' },
    { code: 'KO', name: '한국어', countryCode: 'KR' },
    { code: 'TH', name: 'ไทย', countryCode: 'TH' },
    { code: 'VI', name: 'Tiếng Việt', countryCode: 'VN' },
    { code: 'ID', name: 'Bahasa Indonesia', countryCode: 'ID' },
    { code: 'MS', name: 'Bahasa Melayu', countryCode: 'MY' },
    { code: 'TL', name: 'Filipino', countryCode: 'PH' },
    { code: 'CA', name: 'Català', countryCode: 'ES' },
    { code: 'EU', name: 'Euskera', countryCode: 'ES' },
    { code: 'GL', name: 'Galego', countryCode: 'ES' },
    { code: 'IS', name: 'Íslenska', countryCode: 'IS' },
    { code: 'MT', name: 'Malti', countryCode: 'MT' },
    { code: 'CY', name: 'Cymraeg', countryCode: 'GB' },
    { code: 'GA', name: 'Gaeilge', countryCode: 'IE' },
    { code: 'MK', name: 'Македонски', countryCode: 'MK' },
    { code: 'AL', name: 'Shqip', countryCode: 'AL' },
    { code: 'BS', name: 'Bosanski', countryCode: 'BA' },
    { code: 'ME', name: 'Crnogorski', countryCode: 'ME' },
    { code: 'BE', name: 'Беларуская', countryCode: 'BY' }
  ];

  constructor(public themeService: DarkModeService) {
    this.themeService.isDarkMode$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isDark => {
        console.log('Application theme:', isDark ? 'Dark' : 'Light');
      });
  }

  ngOnInit() {
    const savedLanguage = localStorage.getItem('selectedLanguage');

    if (savedLanguage) {
      const found = this.languages.find(lang => lang.code === savedLanguage);
      if (found) {
        this.selectedLanguage = found;
      } else {
        this.selectedLanguage = this.languages[0];
      }
    } else {
      this.selectedLanguage = this.languages[0];
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  markAllAsRead(event: Event) {
    event?.stopPropagation();
  }

  openNotification(notification: any) {

  }

  getNotificationIcon(notificationType: any) {

  }

  setLanguage(lang: Language) {

  }

  viewAllNotifications(event: Event) {
    event.stopPropagation();
  }

  navigateToProfile() {

  }

  navigateToSettings() {

  }

  navigateToHelp() {

  }

  logout() {

  }

  get beta() {
    return "BETA";
  }
}
