import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { TMDbConfig } from '@core/config/tmdb';
import { createCache } from '@core/cache';
import type { Film, FilmListResponse } from '@domain/film';

const baseQueryWithFetch = fetchBaseQuery({
  baseUrl: TMDbConfig.API_BASE_URL,
});

const tmdbCache = createCache<string, Film | FilmListResponse>('tmdb');

/**
 * Generates cache key from URL and params.
 */
const getCacheKey = (url: string, params?: Record<string, string>): string => {
  if (!params || Object.keys(params).length === 0) {
    return url;
  }

  const sortedParams = Object.keys(params)
    .sort()
    .map(key => `${key}=${params[key]}`)
    .join('&');

  return `${url}?${sortedParams}`;
};

/**
 * Searches films client-side from cached data.
 * Searches through now playing and popular films.
 */
const searchCachedFilms = async (
  query: string,
): Promise<FilmListResponse | null> => {
  try {
    const searchTerm = query.toLowerCase().trim();
    if (!searchTerm) {
      return null;
    }

    // Get cached now playing and popular films
    const nowPlayingKey = getCacheKey('movie/now_playing', {
      api_key: TMDbConfig.API_KEY,
      language: 'en-US',
      page: '1',
    });
    const popularKey = getCacheKey('movie/popular', {
      api_key: TMDbConfig.API_KEY,
      language: 'en-US',
      page: '1',
    });

    const [nowPlayingData, popularData] = await Promise.all([
      tmdbCache.get(nowPlayingKey),
      tmdbCache.get(popularKey),
    ]);

    const allFilms: Film[] = [];

    if (nowPlayingData && 'results' in nowPlayingData) {
      allFilms.push(...nowPlayingData.results);
    }

    if (popularData && 'results' in popularData) {
      allFilms.push(...popularData.results);
    }

    // Remove duplicates by film ID
    const uniqueFilms = Array.from(
      new Map(allFilms.map(film => [film.id, film])).values(),
    );

    // Search by title (case-insensitive)
    const matchingFilms = uniqueFilms.filter(film =>
      film.title.toLowerCase().includes(searchTerm),
    );

    if (matchingFilms.length === 0) {
      return null;
    }

    return {
      page: 1,
      results: matchingFilms,
      total_pages: 1,
      total_results: matchingFilms.length,
    };
  } catch {
    return null;
  }
};

/**
 * Custom baseQuery with AsyncStorage cache.
 * Intercepts requests to check cache first, then makes API call if needed.
 * For search queries, falls back to client-side search if API fails.
 */
const baseQueryWithCache: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const url = typeof args === 'string' ? args : args.url;
  const params =
    typeof args === 'string'
      ? undefined
      : (args.params as Record<string, string> | undefined);

  const cacheKey = getCacheKey(url, params);
  const cachedData = await tmdbCache.get(cacheKey);
  if (cachedData) {
    return { data: cachedData };
  }

  const result = await baseQueryWithFetch(args, api, extraOptions);

  if (result.data && !result.error) {
    await tmdbCache.set(cacheKey, result.data as Film | FilmListResponse);
    return result;
  }

  // If API call failed and this is a search query, try client-side search
  if (result.error && url === 'search/movie' && params?.query) {
    const clientSearchResult = await searchCachedFilms(params.query);
    if (clientSearchResult) {
      await tmdbCache.set(cacheKey, clientSearchResult);
      return { data: clientSearchResult };
    }
    const emptyResult: FilmListResponse = {
      page: 1,
      results: [],
      total_pages: 0,
      total_results: 0,
    };
    await tmdbCache.set(cacheKey, emptyResult);
    return { data: emptyResult };
  }

  return result;
};

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: baseQueryWithCache,
  tagTypes: ['NowPlaying', 'Popular', 'Film', 'Search'],
  endpoints: builder => ({
    /**
     * Fetches now playing films from TMDB.
     */
    getNowPlaying: builder.query<FilmListResponse, number | void>({
      query: (page = 1) => ({
        url: 'movie/now_playing',
        params: {
          api_key: TMDbConfig.API_KEY,
          language: 'en-US',
          page: String(page || 1),
        },
      }),
      providesTags: ['NowPlaying'],
    }),

    /**
     * Fetches popular films from TMDB.
     */
    getPopular: builder.query<FilmListResponse, number | void>({
      query: (page = 1) => ({
        url: 'movie/popular',
        params: {
          api_key: TMDbConfig.API_KEY,
          language: 'en-US',
          page: String(page || 1),
        },
      }),
      providesTags: ['Popular'],
    }),

    /**
     * Fetches film details by ID from TMDB.
     */
    getFilmDetails: builder.query<Film, number>({
      query: id => ({
        url: `movie/${id}`,
        params: {
          api_key: TMDbConfig.API_KEY,
          language: 'en-US',
        },
      }),
      providesTags: (result, error, id) => [{ type: 'Film', id }],
    }),

    /**
     * Searches movies by query string.
     */
    searchMovies: builder.query<
      FilmListResponse,
      { query: string; page?: number }
    >({
      query: ({ query, page = 1 }) => ({
        url: 'search/movie',
        params: {
          api_key: TMDbConfig.API_KEY,
          language: 'en-US',
          query,
          page: page.toString(),
        },
      }),
      providesTags: ['Search'],
    }),
  }),
});

export const {
  useGetNowPlayingQuery,
  useGetPopularQuery,
  useGetFilmDetailsQuery,
  useLazySearchMoviesQuery,
} = tmdbApi;
