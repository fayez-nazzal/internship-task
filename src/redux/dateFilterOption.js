import { createSlice } from '@reduxjs/toolkit';

const dateFilterOptionSlice = createSlice({
  name: 'dateFilterOption',
  initialState: 'preset',
  reducers: {
    set: (_, { payload }) => payload,
  },
});

export const { set: setDateFilterOption } = dateFilterOptionSlice.actions;

export default dateFilterOptionSlice.reducer;
