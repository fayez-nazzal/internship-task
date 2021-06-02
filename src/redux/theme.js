import { createSlice } from '@reduxjs/toolkit';

const Theme = createSlice({
  name: 'theme',
  initialState:
    localStorage.getItem('sawa-theme') ||
    (window.matchMedia('(prefers-color-scheme: light)').matches && 'light') ||
    'dark',
  reducers: {
    toggle: (state) => {
      const newState = state === 'light' ? 'dark' : 'light';

      localStorage.setItem('sawa-theme', newState);

      return newState;
    },
  },
});

export const { toggle: toggleTheme } = Theme.actions;

export default Theme.reducer;
