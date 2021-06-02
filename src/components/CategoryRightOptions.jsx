import React from 'react';
import {
  Paper,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleCategory,
  checkAllCategories,
  uncheckAllCategories,
} from '../redux/categories';

const StyledPaper = styled(Paper)`
  padding: 1rem;
  width: 240px;
  height: 480px;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const ChecksContainer = styled.div`
  overflow-y: auto;
  margin-top: 0.6rem;
`;

const CategoryRightOptions = () => {
  const categories = useSelector((state) => state.categories);
  const chartColor = useSelector((state) => state.chartColor);
  const dispatch = useDispatch();

  const toggle = (category) => {
    dispatch(toggleCategory(category));
  };

  const checkAll = () => {
    dispatch(checkAllCategories());
  };

  const uncheckAll = () => {
    dispatch(uncheckAllCategories());
  };

  return (
    <StyledPaper>
      <Typography variant="h6">Categories to show:</Typography>
      <div>
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={checkAll}
          style={{
            margin: '0 0.5rem',
          }}
        >
          Check All
        </Button>
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={uncheckAll}
        >
          Uncheck All
        </Button>
      </div>
      <ChecksContainer>
        {categories.map((categ) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={categ.checked}
                onChange={() => toggle(categ.name)}
                style={{
                  color: chartColor,
                }}
                name={`${categ.name} check`}
              />
            }
            label={categ.name}
            key={categ.name}
          />
        ))}
      </ChecksContainer>
    </StyledPaper>
  );
};

export default CategoryRightOptions;