import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import BranchesGeo from './components/BranchesGeo';
import './App.css';
import CategoryChart from './components/CategoryChart';
import UniqueGoodsChart from './components/UniqueGoodsChart';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4895ef',
    },
    secondary: {
      main: '#4cc9f0',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div style={{ width: 800, height: 800 }}>
        <BranchesGeo />
      </div>
      <div style={{ width: 800, height: 800 }}>
        <CategoryChart />
      </div>
      <div style={{ width: 800, height: 800 }}>
        <UniqueGoodsChart />
      </div>
    </ThemeProvider>
  );
}

export default App;
