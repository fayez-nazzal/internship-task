import {
  getCategories,
  getCategorySalesData,
  getUniqueGoods,
  getUniqueGoodsSalesData,
} from './salesUtils';

test('gets unique goods', () => {
  const uniqueGoods = getUniqueGoods();
  expect(uniqueGoods.length).toBeGreaterThanOrEqual(60);
});

test('gets some unique goods data', () => {
  const uniqueGoods = getUniqueGoods();

  const data = getUniqueGoodsSalesData(
    new Date('January 1, 2019'),
    new Date('November 1, 2020'),
    uniqueGoods.map((item) => ({
      name: item,
      checked: true,
    })),
  );
  expect(data.length).toBeGreaterThan(0);
});

test('unique goods are greater or equal 36', () => {
  const uniqueGoods = getUniqueGoods();

  const data = getUniqueGoodsSalesData(
    new Date('January 1, 2019'),
    new Date('November 1, 2020'),
    uniqueGoods.map((item) => ({
      name: item,
      checked: true,
    })),
  );

  expect(data.length).toBeGreaterThanOrEqual(36);
});

test('filtered unique goods less than unfiltered unique goods', () => {
  const uniqueGoods = getUniqueGoods();

  const filteredData = getUniqueGoodsSalesData(
    new Date('January 1, 2019'),
    new Date('November 1, 2020'),
    uniqueGoods.map((item, index) => ({
      name: item,
      checked: index % 5 !== 0,
    })),
  );

  const data = getUniqueGoodsSalesData(
    new Date('January 1, 2019'),
    new Date('November 1, 2020'),
    uniqueGoods.map((item) => ({
      name: item,
      checked: true,
    })),
  );

  expect(data.length).toBeGreaterThan(filteredData.length);
});

test('gets categories', () => {
  const categories = getCategories();
  expect(categories.length).toBe(12);
});

test('gets categories sales data ', () => {
  const categories = getCategories();

  const data = getCategorySalesData(
    new Date('June 7, 2020'),
    categories.map((category) => ({
      name: category,
      checked: true,
    })),
  );

  expect(data.length).toBe(10);
});

test('gets categories sales data (filtered)', () => {
  const categories = getCategories();

  const data = getCategorySalesData(
    new Date('June 7, 2020'),
    categories.map((category, index) => ({
      name: category,
      checked: index !== 0,
    })),
  );

  expect(data.length).toBe(9);
});
