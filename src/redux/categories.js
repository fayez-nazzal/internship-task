import { createSlice } from '@reduxjs/toolkit';

const categories = createSlice({
  name: 'categoreis',
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
  set: setCategories,
  toggle: toggleCategory,
  checkAll: checkAllCategories,
  uncheckAll: uncheckAllCategories,
} = categories.actions;

export default categories.reducer;
