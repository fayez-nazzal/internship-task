import { DatePicker } from '@material-ui/pickers';
import {
  setDateRnageFilterStart,
  setDateRnageFilterEnd,
} from '../redux/dateRangeFilter';
import { useDispatch, useSelector } from 'react-redux';

const DateRangeFilter = () => {
  const dateRangeFilter = useSelector((state) => state.dateRangeFilter);

  const dispatch = useDispatch();

  const handleStartDateChange = (date) => {
    dispatch(setDateRnageFilterStart(date));
  };

  const handleEndtDateChange = (date) => {
    dispatch(setDateRnageFilterEnd(date));
  };

  return (
    <>
      <DatePicker
        label="Start Date"
        size="large"
        inputVariant="outlined"
        value={dateRangeFilter.startDate}
        onChange={handleStartDateChange}
        style={{
          margin: '0.6rem 0 2rem',
        }}
      />
      <DatePicker
        label="End Date"
        size="large"
        inputVariant="outlined"
        value={dateRangeFilter.endDate}
        onChange={handleEndtDateChange}
      />
    </>
  );
};

export default DateRangeFilter;
