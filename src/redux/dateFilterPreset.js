import { createSlice } from '@reduxjs/toolkit';

const dateFilterPresetSlice = createSlice({
  name: 'dateFilterPreset',
  initialState: {
    str: 'last-1-years',
    subValue: {
      months: 6,
    },
  },
  reducers: {
    set: (state, { payload }) => {
      state.str = payload;
      state.subValue = calculateSubDateFromStr(state.str);
    },
  },
});

export const { set: setDateFilterPreset } = dateFilterPresetSlice.actions;

export const calculateSubDateFromStr = (str) => ({
  days: str.match(/days/) ? parseInt(str.match(/\d/i)[0], 10) : 0,
  months: str.match(/months/) ? parseInt(str.match(/\d/i)[0], 10) : 0,
  years: str.match(/years/) ? parseInt(str.match(/\d/i)[0], 10) : 0,
});

export default dateFilterPresetSlice.reducer;
