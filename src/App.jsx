import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import BranchesGeo from './components/BranchesGeo';
import './App.css';

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
    </ThemeProvider>
  );
}

export default App;
