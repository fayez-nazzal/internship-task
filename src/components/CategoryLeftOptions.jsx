import React, { useState } from 'react';
import { Paper, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { HexColorPicker } from 'react-colorful';
import { useDispatch, useSelector } from 'react-redux';
import { setChartColor } from '../redux/chartColor';
import { DatePicker } from '@material-ui/pickers';
import { setDate } from '../redux/date';
import { dateHasSales } from '../utils/salesUtils';
import HighlightedDay from './HighlitedDay';

const StyledPaper = styled(Paper)`
  padding: 2rem;
  width: 280px;
`;

const CategoryLeftOptions = () => {
  const chartColor = useSelector((state) => state.chartColor);
  const date = useSelector((state) => state.date);
  const dispatch = useDispatch();

  const onColorChange = (color) => {
    dispatch(setChartColor(color));
  };

  const onDateChange = (date) => {
    dispatch(setDate(date.toISOString()));
  };

  const renderCustomDay = (day, _, ___, DayComponent) => {
    return dateHasSales(day) ? (
      <HighlightedDay component={DayComponent} />
    ) : (
      DayComponent
    );
  };

  return (
    <StyledPaper>
      <Typography variant="h6">Date:</Typography>
      <DatePicker
        label="Date"
        size="medium"
        inputVariant="outlined"
        value={date}
        onChange={onDateChange}
        format="MMMM d, y"
        style={{
          margin: '0.6rem 0 2rem',
        }}
        renderDay={renderCustomDay}
      />
      <Typography variant="h6">Chart color:</Typography>
      <HexColorPicker color={chartColor} onChange={onColorChange} />
    </StyledPaper>
  );
};

export default CategoryLeftOptions;
