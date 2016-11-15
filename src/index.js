import React from 'react';
import ReactDOM from 'react-dom';
import Browser from './components/Browser';

let templates = require('./stores/live-data-faker').default;

/*
  Required options:
    divId: (string) id of the div that will house the browser
    onTemplateOpen: (function(templateId)) function to call when opening a template it
      will recieve the following:
        templateId: (int) the id of the template opened
        templateTypeString: (string) the type of template. Eg: 'TextOnly'
*/
function initTemplateBrowser (options) {
  ReactDOM.render(
    <Browser templates={ templates } />,
    document.getElementById(options.divId)
  );
}

window.initTemplateBrowser = initTemplateBrowser;