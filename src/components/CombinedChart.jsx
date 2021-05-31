import { useEffect, useState } from 'react';
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
import { getUniqueGoodsData } from '../utils/salesUtils';

const CombinedChart = () => {
  const [daysData, setDaysData] = useState([]);
  const [goods, setGoods] = useState([]);

  useEffect(() => {
    const uniqueGoodsData = getUniqueGoodsData(
      new Date('May 31, 2019'),
      new Date(),
    );
    setDaysData(uniqueGoodsData.days);
    setGoods(uniqueGoodsData.goods);
  }, []);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        width={800}
        height={800}
        data={daysData}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="dayStr" />
        <YAxis />
        <Tooltip />
        <Legend />
        {goods.map((good) => {
          console.log(good);
          return (
            <Line
              type="linear"
              connectNulls
              dataKey={good}
              stroke={stc(good)}
              strokeWidth={1}
              animationDuration={3000}
            />
          );
        })}
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default CombinedChart;
