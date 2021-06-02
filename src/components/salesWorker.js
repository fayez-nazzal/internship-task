import {
  getCategoryData,
  getUniqueGoods,
  getUniqueGoodsSalesData,
} from '../utils/salesUtils';

export const workUniqueGoods = () => {
  const goods = getUniqueGoods();

  postMessage(goods);
};

export const workGoodsSales = (startDate, endDate, uniqueGoods) => {
  const sales = getUniqueGoodsSalesData(startDate, endDate, uniqueGoods);

  postMessage(sales);
};

export const workCategory = (date) => {
  const sales = getCategoryData(date);
  sales && postMessage(sales);
};
