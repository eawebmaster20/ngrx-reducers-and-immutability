import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { counterReducer } from './state/counter.reducer';
import { CounterEffects } from './state/counter.effects';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideStore(), provideEffects(CounterEffects), provideState({name:'counter', reducer:counterReducer}), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })]
};
