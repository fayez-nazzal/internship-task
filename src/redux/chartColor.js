import { createSlice } from '@reduxjs/toolkit';

const chartColor = createSlice({
  name: 'chartColor',
  initialState: '#66b2b2',
  reducers: {
    set: (_, { payload }) => payload,
  },
});

export const { set: setChartColor } = chartColor.actions;

export default chartColor.reducer;
