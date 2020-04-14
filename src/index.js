import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router';
import { history } from './store/store.utils';
import store from './store/index';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" render={() => <App />} />
      </Switch>
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root')
);