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
import { useDispatch, useSelector } from 'react-redux';
import { setUniqueGoods } from '../redux/uniqueGoods';
const workerInstance = worker();

const UniqueGoodsChart = () => {
  const [workerResult, setWorkerResult] = useState(null);
  const uniqueGoods = useSelector((state) => state.uniqueGoods);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const onWorker = ({ data }) => {
      console.log(data);
      data.days && setWorkerResult(data);
      data.goods && dispatch(setUniqueGoods(data.goods));
    };

    workerInstance.addEventListener('message', onWorker);
    workerInstance.workGoods(
      sub(new Date(), {
        months: 6,
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
                animationDuration={2600}
              />
            ),
        )}
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default UniqueGoodsChart;
