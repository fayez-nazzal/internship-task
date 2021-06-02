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

    if (
      (saleDate > startDate && saleDate < endDate) ||
      isSameDay(saleDate, endDate)
    ) {
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

export const getCategories = () => {
  const categories = new HashArray('category');

  salesData.forEach((sale) => {
    sale.items.forEach((item) => {
      if (!categories.get(item.category)) {
        categories.add({
          category: item.category,
        });
      }
    });
  });

  return categories._list.map((category) => category.category);
};

export const getCategorySalesData = (date, categories) => {
  const categoriesSalesHArray = new HashArray('category');
  const filteredCategories = categories.filter((category) => category.checked);
  const filteredCategoriesHArray = new HashArray('category');

  filteredCategoriesHArray.addAll(
    filteredCategories.map((category) => ({
      category: category.name,
    })),
  );

  salesData.forEach((sale) => {
    const saleDate = parse(sale.createdOn, 'MMMM d, y p', new Date());

    if (isSameDay(date, saleDate)) {
      sale.items.forEach((item) => {
        if (filteredCategoriesHArray.get(item.category)) {
          const haCategory = categoriesSalesHArray.get(item.category);
          if (haCategory) {
            haCategory.sales += item.count;
          } else {
            categoriesSalesHArray.add({
              category: item.category,
              sales: item.count,
            });
          }
        }
      });
    }
  });

  const list = categoriesSalesHArray._list;
  const otherCategoryIndex = list.findIndex(
    (category) => category.category === 'Other',
  );
  const otherCategory = list.splice(otherCategoryIndex, 1)[0];
  list.push(otherCategory);

  return list;
};

export const getBranches = () => {
  const branches = new HashArray('branch');

  salesData.forEach((sale) => {
    if (!branches.get(sale.branch.name)) {
      branches.add({
        branch: sale.branch.name,
        city: sale.branch.city,
        createdOn: parse(sale.createdOn, 'MMMM d, y p', new Date()),
        sales: 0,
      });
    }
  });

  return branches._list;
};

export const getBranchesSalesData = (startDate, endDate) => {
  const allBranches = getBranches();
  const branches = new HashArray('branch');
  let breakPoints = [];
  let highestSales = -1;

  allBranches.forEach((branch) => {
    branches.add({ ...branch, sales: 0 });
  });

  salesData.forEach((sale) => {
    const saleDate = parse(sale.createdOn, 'MMMM d, y p', new Date());

    // if this sale was in the specefied date range, add it to the total sales of that branch
    if (
      (saleDate > startDate && saleDate < endDate) ||
      isSameDay(saleDate, endDate)
    ) {
      let sales = 0;

      sale.items.forEach((item) => {
        sales += item.count;
      });

      if (sales > highestSales) highestSales = sales;

      const branch = branches.get(sale.branch.name);
      branch['sales'] += sales;
    }
  });

  breakPoints = [
    highestSales / 4,
    highestSales / 3,
    highestSales / 2,
    highestSales,
  ];

  return {
    data: branches._list,
    breakPoints,
  };
};

export const dateHasSales = (date) => {
  return !!salesData.find((sale) =>
    isSameDay(parse(sale.createdOn, 'MMMM d, y p', new Date()), date),
  );
};

export default null;
