import Typography from '@material-ui/core/Typography';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChart } from '../redux/currentChart';
import styled from 'styled-components';
import ToggleButton from '@material-ui/lab/ToggleButton';

const StyledToggleButton = styled(ToggleButton)`
  background-color: ${(props) =>
    props.active ? '#4895ef !important' : '#6ca9bb !important'};

  &:hover {
    background-color: ${(props) =>
      props.active ? '#4895ef !important' : '#39a9cb !important;'};
  }

  margin-bottom: 0.4rem;
`;

const ChartToggleGroup = () => {
  const currentChart = useSelector((state) => state.currentChart);
  const dispatch = useDispatch();

  const handleChange = (_, newVal) => {
    dispatch(setCurrentChart(newVal));
  };

  return (
    <ToggleButtonGroup exclusive value={currentChart} onChange={handleChange}>
      <StyledToggleButton
        active={currentChart === 'goods'}
        value="goods"
        aria-label="Unique goods sales"
      >
        <Typography component="h3" variant="h5">
          Unique goods sales
        </Typography>
      </StyledToggleButton>
      <StyledToggleButton
        active={currentChart === 'category'}
        value="category"
        aria-label="Category sales"
      >
        <Typography component="h3" variant="h5">
          Category sales
        </Typography>
      </StyledToggleButton>
      <StyledToggleButton
        active={currentChart === 'map'}
        value="map"
        aria-label="Total sales geo map"
      >
        <Typography component="h3" variant="h5">
          Branches geo map
        </Typography>
      </StyledToggleButton>
    </ToggleButtonGroup>
  );
};

export default ChartToggleGroup;
