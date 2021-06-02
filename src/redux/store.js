import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './theme';
import currentChartReducer from './currentChart';
import dateFilterOptionReducer from './dateFilterOption';
import dateFilterPresetReducer from './dateFilterPreset';
import dateRangeFilterReducer from './dateRangeFilter';
import uniqueGoodsReducer from './uniqueGoods';
import categoriesReducer from './categories';
import chartColorReducer from './chartColor';

import dateReducer from './date';
export default configureStore({
  reducer: {
    currentChart: currentChartReducer,
    theme: themeReducer,
    dateFilterOption: dateFilterOptionReducer,
    dateFilterPreset: dateFilterPresetReducer,
    dateRangeFilter: dateRangeFilterReducer,
    uniqueGoods: uniqueGoodsReducer,
    categories: categoriesReducer,
    chartColor: chartColorReducer,
    date: dateReducer,
  },
});
