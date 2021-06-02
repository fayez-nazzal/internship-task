import { createSlice } from '@reduxjs/toolkit';

const dateFilterOptionSlice = createSlice({
  name: 'uniqueGoods',
  initialState: [],
  reducers: {
    set: (_, { payload }) =>
      payload.map((good) => ({
        name: good,
        checked: true,
      })),
    toggleIndex: (state, { payload }) => {
      state[payload].checked = !state[payload].checked;
    },
    checkAll: (state) => state.map((item) => ({ ...item, checked: true })),
    uncheckAll: (state) => state.map((item) => ({ ...item, checked: false })),
  },
});

export const {
  set: setUniqueGoods,
  toggleIndex: toggleGoodAtIndex,
  checkAll: checkAllGoods,
  uncheckAll: uncheckAllGoods,
} = dateFilterOptionSlice.actions;

export default dateFilterOptionSlice.reducer;
