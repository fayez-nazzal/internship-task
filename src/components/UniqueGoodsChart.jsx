import { Typography } from '@material-ui/core';
import { sub } from 'date-fns';
import { useLayoutEffect, useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
  Legend,
} from 'recharts';
import stc from 'string-to-color';
import worker from 'workerize-loader!./salesWorker';
const workerInstance = worker();

const UniqueGoodsChart = () => {
  const [workerResult, setWorkerResult] = useState(null);

  useLayoutEffect(() => {
    const onWorker = ({ data }) => {
      console.log(data);
      data.days && setWorkerResult(data);
    };

    workerInstance.addEventListener('message', onWorker);
    workerInstance.workGoods(
      sub(new Date(), {
        years: 1,
      }),
      new Date(),
    );

    return () => {
      workerInstance.removeEventListener('message', onWorker);
    };
  }, []);

  return !workerResult ? (
    <Typography variant="h4">Loading Chart Data</Typography>
  ) : (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart width={700} height={480} data={workerResult.days}>
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="dayStr" />
        <YAxis />
        <Tooltip isAnimationActive={false} />
        <Legend />
        {workerResult.goods.map((good) => (
          <Line
            key={good}
            type="linear"
            connectNulls
            dataKey={good}
            stroke={stc(good)}
            strokeWidth={1}
            h
            animationDuration={2600}
          />
        ))}
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default UniqueGoodsChart;
