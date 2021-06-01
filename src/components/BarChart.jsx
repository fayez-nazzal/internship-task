import { useEffect, useLayoutEffect, useState } from 'react';
import {
  BarChart as BC,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import { getCategoryData } from '../utils/salesUtils';

const BarChart = () => {
  const [categoriesData, setCategoriesData] = useState([]);

  useLayoutEffect(() => {
    setCategoriesData(getCategoryData(new Date('June 7, 2020')));
  }, []);

  useEffect(() => {
    console.log(categoriesData);
  }, [categoriesData]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BC
        width={800}
        height={800}
        data={categoriesData}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" fontSize={11} interval={0} />
        <YAxis dataKey="sales" />
        <Tooltip />
        <Legend />
        <Bar dataKey="sales" fill="#8884d8" />
      </BC>
    </ResponsiveContainer>
  );
};

export default BarChart;
