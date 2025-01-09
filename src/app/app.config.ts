import { ApplicationConfig, importProvidersFrom, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { icons } from './core/infrastructure/ng-zorro/configs/icons-provider';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { fr_FR, provideNzI18n } from 'ng-zorro-antd/i18n';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { reducers } from './core/infrastructure/ngrx/configs/reducers.config';
import { effects } from './core/infrastructure/ngrx/configs/effects.configs';
import { AuthServiceInterface } from './core/domain/services/auth-service.interface';
import { AuthService } from './core/infrastructure/auth/services/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    // Angular providers
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(FormsModule),
    provideHttpClient(),

    // NG-ZORRO providers
    provideNzIcons(icons),
    provideNzI18n(fr_FR),

    // OAuth providers
    provideOAuthClient(),

    // State providers
    provideStore(reducers),
    provideEffects(effects),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      name: 'DQaaS'
    }),

    // Services providers
		{
			provide: AuthServiceInterface,
			useClass: AuthService
		}
  ]
};
