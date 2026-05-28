import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB-0n-S66JzsGfnlmBq_eoad0Dn58_7bFU',
  authDomain: 'ppw-practica-ba999.firebaseapp.com',
  projectId: 'ppw-practica-ba999',
  storageBucket: 'ppw-practica-ba999.firebasestorage.app',
  messagingSenderId: '64294708651',
  appId: '1:64294708651:web:1e31f5eee1a3bb48859eee',
  measurementId: 'G-5ZXHS73YED',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
