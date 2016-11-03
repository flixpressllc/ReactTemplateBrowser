import React from 'react';
import ReactDOM from 'react-dom';
import Browser from './components/Browser';

let templates = [{
  id: 1,
  tags: ['Fast', 'White', 'Pro Templates', 'Animal'],
  name: 'Rabbit Runner Pro',
  image: 'http://don.digital-edge.biz/tempImages/67.jpg',
  type: "Images",
  duration: '0:10',
  plan: 'personal',
  price: '$3'
},{
  id: 2,
  tags: ['Slow', 'Green', 'Basic', 'Animal'],
  name: 'Turtle Walker',
  image: 'http://don.digital-edge.biz/tempImages/66.jpg',
  type: "Images",
  duration: '0:10',
  plan: 'personal',
  price: '$5'
}];

ReactDOM.render(
  <Browser templates={ templates } />,
  document.getElementById('root')
);
