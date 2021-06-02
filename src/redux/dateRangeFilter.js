import { createSlice } from '@reduxjs/toolkit';
import { sub } from 'date-fns';
import {
  calculateSubDateFromStr,
  setDateFilterPreset,
} from './dateFilterPreset';

const dateRangeFilterSlice = createSlice({
  name: 'dateRangeFilter',
  initialState: {
    startDate: sub(new Date(), {
      years: 1,
    }).toISOString(),
    endDate: new Date().toISOString(),
  },
  reducers: {
    setStartDate: (state, { payload }) => {
      state.startDate = payload;
    },
    setEndDate: (state, { payload }) => {
      state.endDate = payload;
    },
  },
  extraReducers: {
    [setDateFilterPreset]: (state, { payload }) => {
      const subValue = calculateSubDateFromStr(payload);
      state.startDate = sub(new Date(), subValue).toISOString();
      state.endDate = new Date().toISOString();
    },
  },
});

export const {
  setStartDate: setDateRnageFilterStart,
  setEndDate: setDateRnageFilterEnd,
} = dateRangeFilterSlice.actions;

export default dateRangeFilterSlice.reducer;
