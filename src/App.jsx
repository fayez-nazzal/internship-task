import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

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
    <ThemeProvider theme={theme}>Just the overall structure...</ThemeProvider>
  );
}

export default App;
