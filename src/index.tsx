import ReactDOM from 'react-dom';
import App from './App';

import {Provider} from 'react-redux';
import store from './store/store'

import { ThemeProvider } from 'styled-components';
import Theme from './theme/theme';
import {Global} from './theme/global';

ReactDOM.render(
  <>
    <Global></Global>
    <Provider store={store}>
      <ThemeProvider theme={Theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </>,
  document.getElementById('root')
);