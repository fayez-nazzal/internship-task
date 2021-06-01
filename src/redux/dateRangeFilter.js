import { createSlice } from '@reduxjs/toolkit';

const dateRangeFilterSlice = createSlice({
  name: 'dateRangeFilter',
  initialState: {
    startDate: null,
    endDate: null,
  },
  reducers: {
    setStartDate: (state, { payload }) => {
      state.startDate = payload;
    },
    setEndDate: (state, { payload }) => {
      state.endDate = payload;
    },
  },
});

export const {
  setStartDate: setDateRnageFilterStart,
  setEndDate: setDateRnageFilterEnd,
} = dateRangeFilterSlice.actions;

export default dateRangeFilterSlice.reducer;
