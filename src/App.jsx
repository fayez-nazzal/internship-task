import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import './styles/App.css';
import ChartToggleGroup from './components/ChartToggleGroup';
import { useSelector } from 'react-redux';
import UniqueGoodsChart from './components/UniqueGoodsChart';
import CategoryChart from './components/CategoryChart';
import BranchesGeo from './components/BranchesGeo';
import UniqueGoodsLeftOptions from './components/UniqueGoodsLeftOptions';
import UniqueGoodsRightOptions from './components/UniqueGoodsRightOptions';
import CategoryLeftOptions from './components/CategoryLeftOptions';
import CategoryRightOptions from './components/CategoryRightOptions';
import BranchesGeoLeftOptions from './components/BranchesGeoLeftOptions';
import { ReactComponent as MarketIcon } from './svg/market.svg';
import { ReactComponent as Analysis } from './svg/analysis.svg';
import ThemeToggler from './components/ThemeToggler';
import { CssBaseline } from '@material-ui/core';

const ChartContainer = styled.div`
  width: 900px;
  height: 480px;
  margin: 0 auto;
`;

const AnalyticContainer = styled.div`
  display: flex;
  margin: 2rem 2.8rem;
`;

const StyledMarketIcon = styled(MarketIcon)`
  width: 48px;
  height: 48px;
  margin: 0 0.4rem;
`;

const StyledAnalysisIcon = styled(Analysis)`
  width: 32px;
  height: 32px;
  margin: 0 0.5rem;
`;

const FlexedTypography = styled(Typography)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

function App() {
  const currentChart = useSelector((state) => state.currentChart);
  const theme = useSelector((state) => state.theme);

  const muiTheme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: theme,
          primary: {
            main: '#4cc9f0',
          },
          secondary: {
            main: '#4895ef',
          },
        },
        overrides: {
          MuiCssBaseline: {
            '@global': {
              body: {
                transition: 'background-color 0.3s ease-in-out',
              },
            },
          },
        },
      }),
    [theme],
  );

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Box textAlign="center" aria-label="chart button group">
        <Typography component="h1" variant="h2">
          <StyledMarketIcon />
          Sawa Supermarket
          <StyledMarketIcon />
        </Typography>
        <FlexedTypography gutterBottom component="h2" variant="h4">
          <StyledAnalysisIcon />
          CMO data analysis tools
          <StyledAnalysisIcon />
        </FlexedTypography>
        <ChartToggleGroup />
        <AnalyticContainer>
          {(currentChart === 'goods' && <UniqueGoodsLeftOptions />) ||
            (currentChart === 'category' && <CategoryLeftOptions />) ||
            (currentChart === 'map' && <BranchesGeoLeftOptions />)}
          <ChartContainer>
            {(currentChart === 'goods' && <UniqueGoodsChart />) ||
              (currentChart === 'category' && <CategoryChart />) ||
              (currentChart === 'map' && <BranchesGeo />)}
          </ChartContainer>
          {(currentChart === 'goods' && <UniqueGoodsRightOptions />) ||
            (currentChart === 'category' && <CategoryRightOptions />)}
        </AnalyticContainer>
        <ThemeToggler />
      </Box>
    </ThemeProvider>
  );
}

export default App;
