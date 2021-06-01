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
import worker from 'workerize-loader!./salesWorker';
import { Typography } from '@material-ui/core';
const workerInstance = worker();

const CategoryChart = () => {
  const [workerResult, setWorkerResult] = useState(null);

  useLayoutEffect(() => {
    const onWorker = ({ data }) => {
      console.log(data);
      data.length && setWorkerResult(data);
    };

    workerInstance.addEventListener('message', onWorker);
    workerInstance.workCategory(new Date('June 7, 2020'));

    return () => {
      workerInstance.removeEventListener('message', onWorker);
    };
  }, []);

  return !workerResult ? (
    <Typography variant="h4">Loading Chart Data</Typography>
  ) : (
    <ResponsiveContainer width="100%" height="100%">
      <BC
        width={700}
        height={480}
        data={workerResult}
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

export default CategoryChart;
