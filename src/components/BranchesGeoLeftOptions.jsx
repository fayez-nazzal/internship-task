import { Paper, Typography } from '@material-ui/core';
import styled from 'styled-components';
import DateRangeFilter from './DateRangeFilter';

const StyledPaper = styled(Paper)`
  padding: 2rem;
  width: 280px;

  @media only screen and (max-width: 768px) {
    width: 80vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const BranchesGeoLeftOptions = () => {
  return (
    <StyledPaper>
      <Typography variant="h6">Date filter:</Typography>
      <DateRangeFilter />
    </StyledPaper>
  );
};

export default BranchesGeoLeftOptions;
