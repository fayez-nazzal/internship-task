import { DatePicker } from '@material-ui/pickers';
import {
  setDateRnageFilterStart,
  setDateRnageFilterEnd,
} from '../redux/dateRangeFilter';
import { useDispatch, useSelector } from 'react-redux';
import { dateHasSales } from '../utils/salesUtils';
import HighlightedDay from './HighlitedDay';

const DateRangeFilter = () => {
  const dateRangeFilter = useSelector((state) => state.dateRangeFilter);

  const dispatch = useDispatch();

  const handleStartDateChange = (date) => {
    dispatch(setDateRnageFilterStart(date.toISOString()));
  };

  const handleEndtDateChange = (date) => {
    dispatch(setDateRnageFilterEnd(date.toISOString()));
  };

  const renderCustomDay = (day, _, ___, DayComponent) => {
    return dateHasSales(day) ? (
      <HighlightedDay component={DayComponent} />
    ) : (
      DayComponent
    );
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
        renderDay={renderCustomDay}
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
        renderDay={renderCustomDay}
        format="MMMM d, y"
      />
    </>
  );
};

export default DateRangeFilter;
