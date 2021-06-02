import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import './App.css';
import ChartToggleGroup from './components/ChartToggleGroup';
import { useSelector } from 'react-redux';
import UniqueGoodsChart from './components/UniqueGoodsChart';
import CategoryChart from './components/CategoryChart';
import BranchesGeo from './components/BranchesGeo';
import UniqueGoodsLeftOptions from './components/UniqueGoodsLeftOptions';
import UniqueGoodsRightOptions from './components/UniqueGoodsRightOptions';
import CategoryLeftOptions from './components/CategoryLeftOptions';
import CategoryRightOptions from './components/CategoryRightOptions';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4cc9f0',
    },
    secondary: {
      main: '#4895ef',
    },
  },
});

const ChartContainer = styled.div`
  width: 900px;
  height: 480px;
  margin: 0 auto;
`;

const AnalyticContainer = styled.div`
  display: flex;
`;

function App() {
  const currentChart = useSelector((state) => state.currentChart);
  return (
    <ThemeProvider theme={theme}>
      <Box textAlign="center" aria-label="chart button group">
        <Typography component="h1" variant="h2">
          Sawa Supermarket
        </Typography>
        <Typography component="h2" variant="h4">
          CMO data analysis tools
        </Typography>
        <ChartToggleGroup />
        <AnalyticContainer>
          {(currentChart === 'goods' && <UniqueGoodsLeftOptions />) ||
            (currentChart === 'category' && <CategoryLeftOptions />) ||
            (currentChart === 'map' && <BranchesGeo />)}
          <ChartContainer>
            {(currentChart === 'goods' && <UniqueGoodsChart />) ||
              (currentChart === 'category' && <CategoryChart />) ||
              (currentChart === 'map' && <BranchesGeo />)}
          </ChartContainer>
          {(currentChart === 'goods' && <UniqueGoodsRightOptions />) ||
            (currentChart === 'category' && <CategoryRightOptions />) ||
            (currentChart === 'map' && <BranchesGeo />)}
        </AnalyticContainer>
      </Box>
    </ThemeProvider>
  );
}

export default App;
