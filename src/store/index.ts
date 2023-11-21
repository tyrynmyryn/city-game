import { configureStore } from '@reduxjs/toolkit';

import players from '@/store/players';
import cities from '@/store/cities';
import views from '@/store/views';
import rules from '@/store/rules';

export const store = configureStore({
  reducer: {
    players,
    rules,
    cities,
    views,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
