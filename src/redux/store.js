import { configureStore } from '@reduxjs/toolkit';
import currentChartReducer from './currentChart';

export default configureStore({
  reducer: {
    currentChart: currentChartReducer,
  },
});
