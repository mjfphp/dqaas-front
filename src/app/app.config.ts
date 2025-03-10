import { ApplicationConfig, importProvidersFrom, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { fr_FR, provideNzI18n } from 'ng-zorro-antd/i18n';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { reducers } from './core/infrastructure/ngrx/configs/reducers.config';
import { effects } from './core/infrastructure/ngrx/configs/effects.configs';
import { icons } from './core/infrastructure/ng-zorro/configs/icons-provider';
import { AuthServiceInterface } from './core/domain/services/auth-service.interface';
import { AuthService } from './core/infrastructure/auth/services/auth.service';
import { TokenServiceInterface } from './core/domain/services/token-service.interface';
import { TokenService } from './core/infrastructure/auth/services/token.service';
import { interceptorsFns } from './core/infrastructure/angular-http/configs/interceptors.config';
import { environment } from '../environments/environment';
import { FakeTokenService } from './core/infrastructure/auth/services-mock/fake-token.service';
import { TsLocalStorageService } from './shared/local-storage/infrastructure/ts-local-storage.service';
import { LocalStorageServiceInterface } from './shared/local-storage/domain/services/local-storage.interface';
import { FakeProjectRepositoryImpl } from './features/projects/infrastructure/repositories-mock/fake-project.repository.impl';
import { ProjectRepositoryImpl } from './features/projects/infrastructure/repositories/project.repository.impl';
import { ProjectRepository } from './features/projects/domain/repositories/project.repository';


export const appConfig: ApplicationConfig = {
  providers: [
    // Angular providers______________________________________________________________
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(FormsModule),
    provideHttpClient(withInterceptors(interceptorsFns)),

    // NG-ZORRO providers_____________________________________________________________
    importProvidersFrom(NzModalModule),
    provideNzIcons(icons),
    provideNzI18n(fr_FR),

    // OAuth providers
    provideOAuthClient(),

    // State providers________________________________________________________________
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

    // Services providers_____________________________________________________________
    {
			provide: LocalStorageServiceInterface,
			useClass: TsLocalStorageService,
		},
		{
			provide: AuthServiceInterface,
			useClass: AuthService,
		},
		{
			provide: TokenServiceInterface,
			useClass: environment.useFakeAuth ? FakeTokenService : TokenService,
		},
		{
			provide: ProjectRepository,
			useClass: environment.useFakeProjectRepository ? FakeProjectRepositoryImpl : ProjectRepositoryImpl,
		},
  ]
};
