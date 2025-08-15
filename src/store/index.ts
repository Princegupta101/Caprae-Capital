import { configureStore } from '@reduxjs/toolkit';

import acquisitionSlice from './slices/acquisitionSlice';
import authSlice from './slices/authSlice';
import matchesSlice from './slices/matchesSlice';
import onboardingSlice from './slices/onboardingSlice';
import profilesSlice from './slices/profilesSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    onboarding: onboardingSlice,
    profiles: profilesSlice,
    matches: matchesSlice,
    acquisition: acquisitionSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
