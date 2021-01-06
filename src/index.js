import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from './store'
import {
  initAuth, Formio,
  // Components
} from 'react-formio';
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'

// import { BrowserRouter } from 'react-router-dom'

// import components from './components';
import { AppConfig } from './config';

import './styles.scss'

Formio.setProjectUrl(AppConfig.projectUrl);
Formio.setBaseUrl(AppConfig.apiUrl);

// Components.setComponents(components);

// Initialize the current user
store.dispatch(initAuth());

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
    {/* <BrowserRouter> */}
      <div>
        <App />
      </div>
    {/* </BrowserRouter> */}
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
