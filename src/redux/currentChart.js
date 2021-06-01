import { createSlice } from '@reduxjs/toolkit';

const currentChartSlice = createSlice({
  name: 'currentChart',
  initialState: null,
  reducers: {
    set: (_, { payload }) => payload,
  },
});

export const { set: setCurrentChart } = currentChartSlice.actions;

export default currentChartSlice.reducer;
