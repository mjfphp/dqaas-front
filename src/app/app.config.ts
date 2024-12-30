import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { definePreset } from '@primeng/themes';
import { primaryPalette } from './core/config/colors';

// Primary color customization
const jemsPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: primaryPalette[50],
      100: primaryPalette[100],
      200: primaryPalette[200],
      300: primaryPalette[300],
      400: primaryPalette[400],
      500: primaryPalette[500],
      600: primaryPalette[600],
      700: primaryPalette[700],
      800: primaryPalette[800],
      900: primaryPalette[900],
      950: primaryPalette[950]
    }
  }
});

// App configuration
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      ripple: true,
      theme: {
        preset: jemsPreset,
        options: {
          cssLayer: {
            name: 'primeng',
            order: 'app-styles, primeng'
          }
        }
      }
    })
  ]
};
