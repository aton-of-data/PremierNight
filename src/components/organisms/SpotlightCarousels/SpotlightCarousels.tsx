import React from 'react';
import { PopularCarousel } from '@components/organisms';
import { NowPlayingCarousel } from '@components/organisms';
import { SearchResultsCarousel } from '@components/organisms';
import { useAppSelector } from '@core/store';

/**
 * Spotlight carousels component.
 *
 * @returns The spotlight carousels component.
 *
 * @example
 * <SpotlightCarousels />
 */
export const SpotlightCarousels: React.FC = () => {
  const isSearchActive = useAppSelector(
    state => state.spotlightHome.isSearchActive,
  );

  if (isSearchActive) {
    return <SearchResultsCarousel />;
  }

  return (
    <>
      <NowPlayingCarousel />
      <PopularCarousel />
    </>
  );
};
