import { createSlice } from '@reduxjs/toolkit';

const Theme = createSlice({
  name: 'theme',
  initialState: 'dark',
  reducers: {
    toggle: (state) => (state === 'light' ? 'dark' : 'light'),
  },
});

export const { toggle: toggleTheme } = Theme.actions;

export default Theme.reducer;
