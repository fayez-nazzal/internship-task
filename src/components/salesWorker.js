import { getCategoryData, getUniqueGoodsData } from '../utils/salesUtils';

export const workGoods = (startDate, endDate) => {
  const sales = getUniqueGoodsData(startDate, endDate);
  sales.days && postMessage(sales);
};

export const workCategory = (date) => {
  const sales = getCategoryData(date);
  sales && postMessage(sales);
};
