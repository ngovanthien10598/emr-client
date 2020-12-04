import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from 'store/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { ConfigProvider } from 'antd';
import viVN from 'antd/lib/locale/vi_VN';

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={viVN}>
      <App />
    </ConfigProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
