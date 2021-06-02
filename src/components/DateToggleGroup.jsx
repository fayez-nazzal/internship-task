import Typography from '@material-ui/core/Typography';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { useDispatch, useSelector } from 'react-redux';
import { setDateFilterOption } from '../redux/dateFilterOption';
import styled from 'styled-components';
import ToggleButton from '@material-ui/lab/ToggleButton';

const StyledToggleButton = styled(ToggleButton)`
  background-color: ${(props) =>
    props.active ? '#7cb7d0 !important' : '#7795a0 !important'};

  &:hover {
    background-color: ${(props) =>
      props.active ? '#9dbeb9 !important' : '#39a9cb !important;'};
  }
`;

const DateToggleGroup = () => {
  const dateFilterOption = useSelector((state) => state.dateFilterOption);
  const dispatch = useDispatch();

  const handleChange = (_, newVal) => {
    dispatch(setDateFilterOption(newVal));
  };

  return (
    <ToggleButtonGroup
      exclusive
      value={dateFilterOption}
      onChange={handleChange}
      size="small"
      aria-label="Date filter Option button group"
      style={{
        marginBottom: '1rem',
      }}
    >
      <StyledToggleButton
        active={dateFilterOption === 'preset'}
        value="preset"
        aria-label="Preset date filters"
      >
        <Typography component="h3" variant="h5">
          Preset
        </Typography>
      </StyledToggleButton>
      <StyledToggleButton
        active={dateFilterOption === 'custom'}
        value="custom"
        aria-label="Custom date filters"
      >
        <Typography component="h3" variant="h5">
          Custom
        </Typography>
      </StyledToggleButton>
    </ToggleButtonGroup>
  );
};

export default DateToggleGroup;
