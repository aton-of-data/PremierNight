import React, { useEffect, useState } from 'react';
import { SearchBar } from './SearchBar';
import { useAppDispatch, useAppSelector } from '@core/store';
import { setSearchQuery, clearSearch } from '@store/slices/spotlightHomeSlice';

interface SearchBarWithContextProps {
  containerStyle?: any;
}

/**
 * SearchBar with context.
 *
 * @param containerStyle - The style of the container.
 * @returns The search bar with context.
 *
 * @example
 * <SearchBarWithContext containerStyle={styles.container} />
 */
export const SearchBarWithContext: React.FC<SearchBarWithContextProps> = ({
  containerStyle,
}) => {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector(state => state.spotlightHome.searchQuery);
  const [searchText, setSearchText] = useState(searchQuery);

  useEffect(() => {
    setSearchText(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (!searchText.trim()) {
      dispatch(clearSearch());
      return;
    }

    const timeoutId = setTimeout(() => {
      dispatch(setSearchQuery(searchText));
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchText, dispatch]);

  return (
    <SearchBar
      value={searchText}
      onChangeText={setSearchText}
      loading={false}
      placeholder="Search films..."
      containerStyle={containerStyle}
    />
  );
};
