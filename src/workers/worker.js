import {
  getBranchesSalesData,
  getCategories,
  getCategorySalesData,
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

export const workCategories = () => {
  const categories = getCategories();

  postMessage(categories);
};

export const workCategoriesSales = (date, categories) => {
  const sales = getCategorySalesData(date, categories);
  sales && postMessage(sales);
};

export const workBranchesSales = (startDate, endDate) => {
  const branchesSales = getBranchesSalesData(startDate, endDate);
  branchesSales && postMessage(branchesSales);
};
