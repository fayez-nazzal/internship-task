import { Typography } from '@material-ui/core';
import { parseISO } from 'date-fns';
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
import { useDispatch, useSelector } from 'react-redux';
import { setUniqueGoods } from '../redux/uniqueGoods';
const workerInstance = worker();

const UniqueGoodsChart = () => {
  const [workerResult, setWorkerResult] = useState(null);
  const uniqueGoods = useSelector((state) => state.uniqueGoods);
  const dateRange = useSelector((state) => state.dateRangeFilter);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const onWorker = ({ data }) => {
      console.log(data);
      data.days && setWorkerResult(data);
      data.goods && dispatch(setUniqueGoods(data.goods));
    };

    workerInstance.addEventListener('message', onWorker);
    workerInstance.workGoods(
      parseISO(dateRange.startDate),
      parseISO(dateRange.endDate),
    );

    return () => {
      workerInstance.removeEventListener('message', onWorker);
    };
  }, [dateRange.startDate, dateRange.endDate]);

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
        {uniqueGoods.map(
          (good) =>
            good.checked && (
              <Line
                key={good.name}
                type="linear"
                connectNulls
                dataKey={good.name}
                stroke={stc(good.name)}
                strokeWidth={1}
                isAnimationActive={false}
              />
            ),
        )}
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default UniqueGoodsChart;
