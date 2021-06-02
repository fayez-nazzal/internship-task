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
    dispatch(setDateRnageFilterStart(date.toISOString()));
  };

  const handleEndtDateChange = (date) => {
    dispatch(setDateRnageFilterEnd(date.toISOString()));
  };

  return (
    <>
      <DatePicker
        label="Start Date"
        size="medium"
        inputVariant="outlined"
        value={dateRangeFilter.startDate}
        onChange={handleStartDateChange}
        format="MMMM d, y"
        maxDate={dateRangeFilter.endDate}
        style={{
          margin: '0.6rem 0 2rem',
        }}
      />
      <DatePicker
        label="End Date"
        size="medium"
        inputVariant="outlined"
        value={dateRangeFilter.endDate}
        onChange={handleEndtDateChange}
        minDate={dateRangeFilter.startDate}
        format="MMMM d, y"
      />
    </>
  );
};

export default DateRangeFilter;
