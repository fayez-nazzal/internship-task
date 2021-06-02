import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Checkbox, Paper, Typography } from '@material-ui/core';
import styled from 'styled-components';
import {
  toggleItem,
  checkAllGoods,
  uncheckAllGoods,
} from '../redux/uniqueGoods';
import stc from 'string-to-color';

const StyledPaper = styled(Paper)`
  padding: 1rem;
  width: 280px;
  height: 480px;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  @media only screen and (max-width: 1000px) {
    width: 80vw;
  }
`;

const ChecksContainer = styled.div`
  overflow-y: auto;
  margin-top: 0.6rem;
`;

const UniqueGoodsRightOptions = () => {
  const uniqueGoods = useSelector((state) => state.uniqueGoods);
  const theme = useSelector((state) => state.theme);

  const dispatch = useDispatch();

  const toggle = (item) => {
    dispatch(toggleItem(item));
  };

  const checkAll = () => {
    dispatch(checkAllGoods());
  };

  const uncheckAll = () => {
    dispatch(uncheckAllGoods());
  };

  return (
    <StyledPaper>
      <Typography variant="h6">Items to show:</Typography>
      <div>
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={checkAll}
          style={{
            margin: '0.8rem 0.5rem',
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
      <ChecksContainer className={`scroll-list-for-${theme}`}>
        {uniqueGoods.map((good) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={good.checked}
                onChange={() => toggle(good.name)}
                style={{
                  color: stc(good.name),
                }}
                name={`${good.name} check`}
              />
            }
            label={good.name}
            key={good.name}
          />
        ))}
      </ChecksContainer>
    </StyledPaper>
  );
};

export default UniqueGoodsRightOptions;
