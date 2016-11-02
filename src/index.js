import React from 'react';
import ReactDOM from 'react-dom';
import Browser from './Browser';
import './index.css';

let templates = [{
  id: 1,
  tags: ['fast', 'white', 'pro', 'animal'],
  name: 'Rabbit Runner Pro'
},{
  id: 2,
  tags: ['slow', 'green', 'basic', 'animal'],
  name: 'Turtle Walker'
}];

ReactDOM.render(
  <Browser templates={ templates } />,
  document.getElementById('root')
);
