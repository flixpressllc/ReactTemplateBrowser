import React from 'react';
import ReactDOM from 'react-dom';
import Browser from './Browser';
import './index.css';

let templates = [{
  id: 1,
  tags: ['fast']
},{
  id: 2,
  tags: ['slow']
}];

ReactDOM.render(
  <Browser templates={ templates } />,
  document.getElementById('root')
);
