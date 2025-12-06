import { createApi } from '@reduxjs/toolkit/query/react';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { storage } from '@core/storage';
import type { Film } from '@domain/film';

const STORAGE_KEY = '@premiere_night:watchlist';

/**
 * Custom baseQuery using AsyncStorage for local state management.
 */
const baseQueryWithStorage: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async args => {
  try {
    const url = typeof args === 'string' ? args : args.url;
    const method = typeof args === 'string' ? 'GET' : args.method || 'GET';
    const body = typeof args === 'string' ? undefined : args.body;

    if (method === 'GET' && url === 'watchlist') {
      const watchlist = await storage.getItem<Film[]>(STORAGE_KEY);
      return { data: watchlist || [] };
    }

    if (method === 'POST' && url === 'watchlist/add') {
      const film = body as Film;
      const currentWatchlist = await storage.getItem<Film[]>(STORAGE_KEY);
      const watchlist = currentWatchlist || [];

      if (watchlist.some(f => f.id === film.id)) {
        return { data: watchlist };
      }

      const newWatchlist = [...watchlist, film];
      await storage.setItem(STORAGE_KEY, newWatchlist);
      return { data: newWatchlist };
    }

    if (method === 'DELETE' && url.startsWith('watchlist/remove/')) {
      const filmId = parseInt(url.split('/').pop() || '0', 10);
      const currentWatchlist = await storage.getItem<Film[]>(STORAGE_KEY);
      const watchlist = currentWatchlist || [];

      const newWatchlist = watchlist.filter(f => f.id !== filmId);
      await storage.setItem(STORAGE_KEY, newWatchlist);
      return { data: newWatchlist };
    }

    if (method === 'PUT' && url === 'watchlist/toggle') {
      const film = body as Film;
      const currentWatchlist = await storage.getItem<Film[]>(STORAGE_KEY);
      const watchlist = currentWatchlist || [];
      const isInWatchlist = watchlist.some(f => f.id === film.id);

      let newWatchlist: Film[];
      if (isInWatchlist) {
        newWatchlist = watchlist.filter(f => f.id !== film.id);
      } else {
        newWatchlist = [...watchlist, film];
      }

      await storage.setItem(STORAGE_KEY, newWatchlist);
      return { data: newWatchlist };
    }

    return {
      error: {
        status: 400,
        data: { message: 'Invalid operation' },
      },
    };
  } catch (error) {
    return {
      error: {
        status: 500,
        data: {
          message:
            error instanceof Error
              ? error.message
              : 'Failed to perform operation',
        },
      },
    };
  }
};

export const watchlistApi = createApi({
  reducerPath: 'watchlistApi',
  baseQuery: baseQueryWithStorage,
  tagTypes: ['Watchlist'],
  endpoints: builder => ({
    /**
     * Fetches all films in watchlist.
     */
    getWatchlist: builder.query<Film[], void>({
      query: () => 'watchlist',
      providesTags: ['Watchlist'],
    }),

    /**
     * Adds film to watchlist.
     */
    addFilmToWatchlist: builder.mutation<Film[], Film>({
      query: film => ({
        url: 'watchlist/add',
        method: 'POST',
        body: film,
      }),
      invalidatesTags: ['Watchlist'],
    }),

    /**
     * Removes film from watchlist by ID.
     */
    removeFilmFromWatchlist: builder.mutation<Film[], number>({
      query: filmId => ({
        url: `watchlist/remove/${filmId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Watchlist'],
    }),

    /**
     * Toggles film in watchlist (adds if not present, removes if present).
     */
    toggleFilmInWatchlist: builder.mutation<Film[], Film>({
      query: film => ({
        url: 'watchlist/toggle',
        method: 'PUT',
        body: film,
      }),
      invalidatesTags: ['Watchlist'],
    }),
  }),
});

export const {
  useGetWatchlistQuery,
  useAddFilmToWatchlistMutation,
  useRemoveFilmFromWatchlistMutation,
  useToggleFilmInWatchlistMutation,
} = watchlistApi;
