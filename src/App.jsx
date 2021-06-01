import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import BarChart from './components/BarChart';
import { getCategoryData } from './utils/salesUtils';

getCategoryData(new Date('May 31, 2013'), new Date());

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
        <BarChart />
      </div>
    </ThemeProvider>
  );
}

export default App;
