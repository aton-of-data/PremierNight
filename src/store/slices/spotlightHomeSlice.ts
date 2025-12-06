import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SpotlightHomeState {
  searchQuery: string;
  isSearchActive: boolean;
}

const initialState: SpotlightHomeState = {
  searchQuery: '',
  isSearchActive: false,
};

export const spotlightHomeSlice = createSlice({
  name: 'spotlightHome',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.isSearchActive = action.payload.trim().length > 0;
    },
    clearSearch: state => {
      state.searchQuery = '';
      state.isSearchActive = false;
    },
  },
});

export const { setSearchQuery, clearSearch } = spotlightHomeSlice.actions;
