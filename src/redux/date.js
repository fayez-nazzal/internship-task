import { createSlice } from '@reduxjs/toolkit';

const speceficDate = createSlice({
  name: 'date',
  initialState: new Date('June 7, 2020').toISOString(),
  reducers: {
    set: (_, { payload }) => payload,
  },
});

export const { set: setDate } = speceficDate.actions;

export default speceficDate.reducer;
