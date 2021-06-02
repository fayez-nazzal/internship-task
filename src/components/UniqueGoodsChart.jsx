import { Paper, Typography } from '@material-ui/core';
import { differenceInDays, format, parseISO } from 'date-fns';
import { useLayoutEffect, useState } from 'react';
import { ResponsiveLineCanvas } from '@nivo/line';
import worker from 'workerize-loader!../workers/worker';
import { useDispatch, useSelector } from 'react-redux';
import { setUniqueGoods } from '../redux/uniqueGoods';

const goodsWorkerInstance = worker();
const salesWorkerInstance = worker();

const getXAxisTimeInterval = (startDate, endDate) => {
  const dayDifference = Math.abs(differenceInDays(startDate, endDate));
  let interval;

  if (dayDifference <= 7) {
    interval = 'every day';
  } else if (dayDifference <= 40) {
    interval = `every 7 days`;
  } else if (dayDifference <= 140) {
    interval = `every month`;
  } else if (dayDifference <= 400) {
    interval = `every 3 months`;
  } else if (dayDifference <= 900) {
    return 'every 6 months';
  } else if (dayDifference <= 1500) {
    interval = 'every year';
  } else if (dayDifference <= 2400) {
    interval = 'every 2 years';
  } else {
    interval = 'every 3 years';
  }

  return interval;
};

const UniqueGoodsChart = () => {
  const [workerResult, setWorkerResult] = useState(null);
  const dateRange = useSelector((state) => state.dateRangeFilter);
  const uniqueGoods = useSelector((state) => state.uniqueGoods);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const onGoodsWorker = ({ data }) => {
      data.length !== undefined && dispatch(setUniqueGoods(data));
    };

    goodsWorkerInstance.addEventListener('message', onGoodsWorker);
    goodsWorkerInstance.workUniqueGoods();

    return () => {
      goodsWorkerInstance.removeEventListener('message', onGoodsWorker);
    };
  }, []);

  useLayoutEffect(() => {
    const onSalesWorker = ({ data }) => {
      data.length !== undefined && setWorkerResult(data);
    };

    salesWorkerInstance.addEventListener('message', onSalesWorker);
    salesWorkerInstance.workGoodsSales(
      parseISO(dateRange.startDate),
      parseISO(dateRange.endDate),
      uniqueGoods,
    );

    return () => {
      salesWorkerInstance.removeEventListener('message', onSalesWorker);
    };
  }, [dateRange.startDate, dateRange.endDate, uniqueGoods]);

  return !workerResult ? (
    <Typography variant="h5">Loading...</Typography>
  ) : (
    <ResponsiveLineCanvas
      data={workerResult}
      margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
      xScale={{ type: 'time', min: 'auto', max: 'auto', reverse: 'false' }}
      yScale={{
        type: 'point',
        min: 'auto',
        max: 'auto',
        reverse: false,
      }}
      curve="linear"
      axisBottom={{
        tickValues: getXAxisTimeInterval(
          parseISO(dateRange.startDate),
          parseISO(dateRange.endDate),
        ),
        tickSize: 24,
        tickPadding: 5,
        tickRotation: 0,
        format: (values) => {
          return format(values, 'MMM d, y');
        },
        legendOffset: -80,
        legendPosition: 'start',
      }}
      axisLeft={{
        tickValues: 100,
        tickRotation: 0,
        tickSize: 12,
        tickPadding: 8,

        legend: 'sales',
        legendOffset: -40,
      }}
      lineWidth={1}
      axisTop={null}
      axisRight={null}
      colors={{ scheme: 'paired' }}
      tooltip={(value) => {
        console.log(value);
        return (
          <Paper
            style={{
              padding: '0.8rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: value.point.serieColor,
                  display: 'inline-block',
                  marginRight: '0.2rem',
                }}
              />
              <Typography variant="h6">{value.point.serieId}</Typography>
            </div>
            <Typography variant="subtitle1">
              {format(value.point.data.x, 'MMMM d, y')}
            </Typography>
            <Typography variant="subtitle1">
              {`${value.point.data.y} items sold`}
            </Typography>
          </Paper>
        );
      }}
      pointSize={6}
      pointBorderColor={{ from: 'serieColor' }}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={1}
      pointLabelYOffset={-12}
      useMesh={true}
    />
  );
};

export default UniqueGoodsChart;
