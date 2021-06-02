import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { useSelector } from 'react-redux';
import { setDateFilterPreset } from '../redux/dateFilterPreset';
import { useDispatch } from 'react-redux';

const DatePresetsFilter = () => {
  const dateFilterPreset = useSelector((state) => state.dateFilterPreset);
  const dispatch = useDispatch();

  const handleRadioChange = (e) => {
    dispatch(setDateFilterPreset(e.target.value));
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup
        aria-label="date filter preset"
        name="dateFilterPreset"
        value={dateFilterPreset.str}
        onChange={handleRadioChange}
      >
        <FormControlLabel
          value="last-7-days"
          control={<Radio />}
          label="Last week"
        />
        <FormControlLabel
          value="last-1-months"
          control={<Radio />}
          label="Last month"
        />
        <FormControlLabel
          value="last-6-months"
          control={<Radio />}
          label="Last 6 months"
        />
        <FormControlLabel
          value="last-1-years"
          control={<Radio />}
          label="Last year"
        />
        <FormControlLabel
          value="last-2-years"
          control={<Radio />}
          label="Last 2 years"
        />
        <FormControlLabel
          value="last-3-years"
          control={<Radio />}
          label="Last 3 years"
        />
        <FormControlLabel value="all" control={<Radio />} label="All" />
      </RadioGroup>
    </FormControl>
  );
};

export default DatePresetsFilter;
