import { Pipe, PipeTransform } from '@angular/core';
import { Language } from '../enums/language.enum';

@Pipe({
  name: 'languageFlag',
  standalone: true
})
export class LanguageFlagPipe implements PipeTransform {
  private flagMap: Record<Language, string> = {
    [Language.EN]: '🇬🇧',
    [Language.ES]: '🇪🇸',
    [Language.FR]: '🇫🇷',
    [Language.IT]: '🇮🇹',
    [Language.PT]: '🇵🇹',
    [Language.DE]: '🇩🇪',
    [Language.PL]: '🇵🇱',
    [Language.UKR]: '🇺🇦'
  };

  transform(value: Language): string {
    return this.flagMap[value] ?? '🏳️';
  }
}
