import { configureStore } from '@reduxjs/toolkit';
import { tmdbApi } from '@store/api/tmdbApi';
import { watchlistApi } from '@store/api/watchlistApi';
import { spotlightHomeSlice } from '@store/slices/spotlightHomeSlice';

export const store = configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    [watchlistApi.reducerPath]: watchlistApi.reducer,
    spotlightHome: spotlightHomeSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['tmdbApi/executeQuery', 'watchlistApi/executeQuery'],
      },
    })
      .concat(tmdbApi.middleware)
      .concat(watchlistApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
