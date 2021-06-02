import { Paper, Typography } from '@material-ui/core';
import styled from 'styled-components';
import DateRangeFilter from './DateRangeFilter';

const StyledPaper = styled(Paper)`
  padding: 2rem;
  width: 220px;
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
