import { createSlice } from '@reduxjs/toolkit';

const dateFilterPresetSlice = createSlice({
  name: 'dateFilterPreset',
  initialState: {
    str: 'last-6-months',
    subValue: {
      months: 6,
    },
  },
  reducers: {
    set: (state, { payload }) => {
      state.str = payload;
      state.subValue = {
        days: payload.match(/days/) ? parseInt(payload.match(/\d/i)[0], 10) : 0,
        months: payload.match(/months/)
          ? parseInt(payload.match(/\d/i)[0], 10)
          : 0,
        years: payload.match(/years/)
          ? parseInt(payload.match(/\d/i)[0], 10)
          : 0,
      };
    },
  },
});

export const { set: setDateFilterPreset } = dateFilterPresetSlice.actions;

export default dateFilterPresetSlice.reducer;
