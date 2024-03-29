import { createSlice } from '@reduxjs/toolkit';

const uniqueGoods = createSlice({
  name: 'uniqueGoods',
  initialState: [],
  reducers: {
    set: (_, { payload }) =>
      payload.map((item) => ({
        name: item,
        checked: true,
      })),
    toggle: (state, { payload }) => {
      const item = state.find((item) => item.name === payload);
      item.checked = !item.checked;
    },
    checkAll: (state) => state.map((item) => ({ ...item, checked: true })),
    uncheckAll: (state) => state.map((item) => ({ ...item, checked: false })),
  },
});

export const {
  set: setUniqueGoods,
  toggle: toggleItem,
  checkAll: checkAllGoods,
  uncheckAll: uncheckAllGoods,
} = uniqueGoods.actions;

export default uniqueGoods.reducer;
