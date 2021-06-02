import { isSameDay, parse } from 'date-fns';
import salesData from '../data/sales.json';
import HashArray from 'hasharray';
import stc from 'string-to-color';

export const getUniqueGoods = () => {
  const uniqueGoods = new HashArray('id');

  salesData.forEach((sale) => {
    sale.items.forEach((item) => {
      if (!uniqueGoods.get(item.name)) {
        uniqueGoods.add({
          id: item.name,
        });
      }
    });
  });

  return uniqueGoods._list.map((item) => item.id);
};

export const getUniqueGoodsSalesData = (startDate, endDate, uniqueGoods) => {
  const goodsSalesHArray = new HashArray('id');
  const filteredGoods = uniqueGoods.filter((item) => item.checked);
  const filteredGoodsHArray = new HashArray('id');

  filteredGoodsHArray.addAll(
    filteredGoods.map((item) => ({
      id: item.name,
    })),
  );

  salesData.forEach((sale) => {
    const saleDate = parse(sale.createdOn, 'MMMM d, y p', new Date());

    if (saleDate >= startDate && saleDate <= endDate) {
      sale.items.forEach((item) => {
        if (filteredGoodsHArray.get(item.name)) {
          const haItem = goodsSalesHArray.get(item.name);
          if (haItem) {
            haItem.data.push({ x: saleDate, y: item.count });
          } else {
            goodsSalesHArray.add({
              id: item.name,
              color: stc(item.name),
              data: [
                {
                  x: saleDate,
                  y: item.count,
                },
              ],
            });
          }
        }
      });
    }
  });

  return goodsSalesHArray._list;
};

export const getCategoryData = (date) => {
  const categoriesData = [];

  salesData.forEach((sale) => {
    const saleDate = parse(sale.createdOn, 'MMMM d, y p', new Date());
    sale.items.forEach((item) => {
      const categoryName = item.category.replace('Goods', '').trim();
      const categoryDataIndex = categoriesData.findIndex(
        (categData) => categData.name === categoryName,
      );

      if (categoryDataIndex === -1) {
        categoriesData.push({
          name: categoryName,
          sales: 0,
        });
      }

      if (isSameDay(saleDate, date)) {
        categoriesData[categoryDataIndex].sales += item.count;
      }
    });
  });

  const otherIndex = categoriesData.findIndex(
    (category) => category.name === 'Other',
  );
  const otherCategory = categoriesData.splice(otherIndex, 1)[0];
  categoriesData.push(otherCategory);

  return categoriesData;
};

export const getTotalSalesData = (startDate, endDate) => {
  const branches = [];
  let breakPoints = [];
  let highestSales = -1;

  salesData.forEach((sale) => {
    const saleDate = parse(sale.createdOn, 'MMMM d, y p', new Date());

    // if this sale was in the specefied date range, add it to the total sales of that branch
    if (saleDate && startDate && endDate) {
      branches.push({
        name: sale.branch.name,
        city: sale.branch.city,
        createdOn: sale.createdOn,
        sales: 0,
      });
    }

    sale.items.forEach((item) => {
      branches[branches.length - 1].sales += item.count;
    });

    if (branches[branches.length - 1].sales > highestSales)
      highestSales = branches[branches.length - 1].sales;
  });

  breakPoints = [
    highestSales / 4,
    highestSales / 3,
    highestSales / 2,
    highestSales,
  ];

  return {
    data: branches,
    breakPoints,
  };
};

export default null;
