import { Injectable } from '@angular/core';
import { AppSettingsDto } from '../../models/dto/app-settings.dto';
import { Environment } from '../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private _currentAppSettings: AppSettingsDto;

  constructor() {
    this._currentAppSettings = <AppSettingsDto>{
      serviceUrl: Environment.serviceUrl
    }
  }

  public get currentAppSettings(): AppSettingsDto {
    return this._currentAppSettings;
  }

  public get serviceUrl(): string {
    return this._currentAppSettings.serviceUrl;
  }
}
