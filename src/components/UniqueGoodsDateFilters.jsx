import { Paper, Typography } from '@material-ui/core';
import styled from 'styled-components';
import DateToggleGroup from './DateToggleGroup';
import { useDispatch, useSelector } from 'react-redux';
import DateRangeFilter from './DateRangeFilter';
import DatePresetsFilter from './DatePresetsFilter';

const StyledPaper = styled(Paper)`
  padding: 2rem;
  width: 220px;
`;

const UniqueGoodsDateFilters = () => {
  const dateFilterOption = useSelector((state) => state.dateFilterOption);

  return (
    <StyledPaper>
      <Typography variant="h6">Date filter:</Typography>
      <DateToggleGroup />
      <div>
        {dateFilterOption === 'preset' ? (
          <DatePresetsFilter />
        ) : (
          <DateRangeFilter />
        )}
      </div>
    </StyledPaper>
  );
};

export default UniqueGoodsDateFilters;
