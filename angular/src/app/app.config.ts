import { InjectionToken } from '@angular/core';

export interface IAppConfig {
  supportedParameters: string[];
}

export const APP_DI_CONFIG: IAppConfig = {
  supportedParameters: ['{full_name}', '{first_name}']
};

export const APP_CONFIG = new InjectionToken<IAppConfig>('app.config');
