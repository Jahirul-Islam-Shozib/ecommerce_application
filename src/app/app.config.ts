import {
  ApplicationConfig, importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideClientHydration} from '@angular/platform-browser';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import {providePrimeNG} from 'primeng/config';
import Aura from '@primeng/themes/aura';

import {provideFirestore, getFirestore} from '@angular/fire/firestore';

import {routes} from './app.routes';
import {authInterceptor} from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {darkModeSelector: '.app-dark'},
      },
    }),

    importProvidersFrom([
      provideFirestore(() => getFirestore()),
    ])
  ],
};
