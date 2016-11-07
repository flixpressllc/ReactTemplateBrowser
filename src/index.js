import React from 'react';
import ReactDOM from 'react-dom';
import Browser from './components/Browser';

let templates = require('./stores/live-data-faker').default;

ReactDOM.render(
  <Browser templates={ templates } />,
  document.getElementById('root')
);
