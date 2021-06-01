import { add, differenceInDays, format, isSameDay, parse } from 'date-fns';
import salesData from '../data/sales.json';

export const getUniqueGoodsData = (startDate, endDate) => {
  let currDate = startDate;
  const daysData = [];
  const goods = [];

  while (!isSameDay(currDate, endDate)) {
    daysData.push({
      day: currDate,
      dayStr: format(currDate, 'MMM d, y'),
    });
    currDate = add(currDate, {
      days: 1,
    });
  }
  currDate = startDate;

  salesData.forEach((sale) => {
    const saleDate = parse(sale.createdOn, 'MMMM d, y p', new Date());
    if (saleDate > currDate) {
      const dayIndex = Math.abs(differenceInDays(saleDate, currDate));

      if (dayIndex !== -1) {
        sale.items.forEach((item) => {
          const itemSalesOnDay = daysData[dayIndex][item.name];
          daysData[dayIndex][item.name] = itemSalesOnDay
            ? itemSalesOnDay + item.count
            : item.count;
          if (!goods.includes(item.name)) {
            goods.push(item.name);
          }
        });
      }
    }
  });

  return {
    days: daysData,
    goods,
  };
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
