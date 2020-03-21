import React from 'react';
import { Provider } from 'react-redux';
import './config/ReactotronConfig';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import history from './services/history';
import Routes from './routes';
import GlobalStyles from './styles/global';

import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Routes />
        <GlobalStyles />
        <ToastContainer autoClose={3000} />
      </Router>
    </Provider>
  );
}

export default App;
