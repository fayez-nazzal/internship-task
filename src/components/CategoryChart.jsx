import { useLayoutEffect, useState } from 'react';
import worker from 'workerize-loader!../workers/worker';
import { Typography } from '@material-ui/core';
import { setCategories } from '../redux/categories';
import { useDispatch, useSelector } from 'react-redux';
import { ResponsiveBar } from '@nivo/bar';
import { parseISO } from 'date-fns/esm';

const categoriesWorkerInstance = worker();
const salesWorkerInstance = worker();

const CategoryChart = () => {
  const [workerResult, setWorkerResult] = useState(null);
  const categories = useSelector((state) => state.categories);
  const chartColor = useSelector((state) => state.chartColor);
  const date = useSelector((state) => state.date);
  const theme = useSelector((state) => state.theme);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const onCategoriesWorker = ({ data }) => {
      data.length !== undefined && dispatch(setCategories(data));
      console.log(data);
    };

    categoriesWorkerInstance.addEventListener('message', onCategoriesWorker);
    categoriesWorkerInstance.workCategories();

    return () => {
      categoriesWorkerInstance.removeEventListener(
        'message',
        onCategoriesWorker,
      );
    };
  }, []);

  useLayoutEffect(() => {
    const onSalesWorker = ({ data }) => {
      console.log(data);
      data.length !== undefined && setWorkerResult(data.filter(Boolean));
    };

    salesWorkerInstance.addEventListener('message', onSalesWorker);
    salesWorkerInstance.workCategoriesSales(parseISO(date), categories);

    return () => {
      salesWorkerInstance.removeEventListener('message', onSalesWorker);
    };
  }, [categories, date]);

  return !workerResult ? (
    <Typography variant="h5">Loading...</Typography>
  ) : workerResult.length === 0 ? (
    <Typography variant="h4">No sales at the selected date.</Typography>
  ) : (
    <ResponsiveBar
      theme={{
        textColor: theme === 'dark' ? '#cccccc' : '#333333',
      }}
      data={workerResult}
      keys={['sales']}
      indexBy="category"
      margin={{ top: 50, right: 130, bottom: 80, left: 60 }}
      padding={0.3}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={chartColor}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 28,
        legendPosition: 'middle',
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'sales',
        legendPosition: 'middle',
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: 'left-to-right',
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: 'hover',
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />
  );
};

export default CategoryChart;
