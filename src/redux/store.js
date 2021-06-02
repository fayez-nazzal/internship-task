import { configureStore } from '@reduxjs/toolkit';
import currentChartReducer from './currentChart';
import dateFilterOptionReducer from './dateFilterOption';
import dateFilterPresetReducer from './dateFilterPreset';
import dateRangeFilterReducer from './dateRangeFilter';
import uniqueGoodsReducer from './uniqueGoods';

export default configureStore({
  reducer: {
    currentChart: currentChartReducer,
    dateFilterOption: dateFilterOptionReducer,
    dateFilterPreset: dateFilterPresetReducer,
    dateRangeFilter: dateRangeFilterReducer,
    uniqueGoods: uniqueGoodsReducer,
  },
});
