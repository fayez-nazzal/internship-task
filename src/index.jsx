import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import store from './redux/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

ReactDOM.render(
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </MuiPickersUtilsProvider>,
  document.getElementById('root'),
);

reportWebVitals();
