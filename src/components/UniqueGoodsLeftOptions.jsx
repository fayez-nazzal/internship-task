import { Paper, Typography } from '@material-ui/core';
import styled from 'styled-components';
import DateToggleGroup from './DateToggleGroup';
import { useSelector } from 'react-redux';
import DateRangeFilter from './DateRangeFilter';
import DatePresetsFilter from './DatePresetsFilter';

const StyledPaper = styled(Paper)`
  padding: 2rem;
  width: 280px;

  @media only screen and (max-width: 768px) {
    width: 80vw;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const UniqueGoodsLeftOptions = () => {
  const dateFilterOption = useSelector((state) => state.dateFilterOption);

  return (
    <StyledPaper>
      <Typography variant="h6">Date filter:</Typography>
      <DateToggleGroup />
      <StyledDiv>
        {dateFilterOption === 'preset' ? (
          <DatePresetsFilter />
        ) : (
          <DateRangeFilter />
        )}
      </StyledDiv>
    </StyledPaper>
  );
};

export default UniqueGoodsLeftOptions;
