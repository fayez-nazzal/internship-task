import Typography from '@material-ui/core/Typography';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChart } from '../redux/currentChart';
import styled from 'styled-components';
import ToggleButton from '@material-ui/lab/ToggleButton';

const StyledToggleButton = styled(ToggleButton)`
  background-color: #4cc9f0 !important;

  &:hover,
  &:focus {
    background-color: #4895ef !important;
  }
`;

const ChartToggleGroup = () => {
  const currentChart = useSelector((state) => state.currentChart);
  const dispatch = useDispatch();

  const handleChange = (_, newVal) => {
    dispatch(setCurrentChart(newVal));
  };

  return (
    <ToggleButtonGroup exclusive value={currentChart} onChange={handleChange}>
      <StyledToggleButton value="goods" aria-label="Unique goods sales">
        <Typography component="h3" variant="h5">
          Unique goods sales
        </Typography>
      </StyledToggleButton>
      <StyledToggleButton value="category" aria-label="Category sales">
        <Typography component="h3" variant="h5">
          Category sales
        </Typography>
      </StyledToggleButton>
      <StyledToggleButton value="map" aria-label="Total Sales">
        <Typography component="h3" variant="h5">
          Branches map
        </Typography>
      </StyledToggleButton>
    </ToggleButtonGroup>
  );
};

export default ChartToggleGroup;
