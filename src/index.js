import React from 'react';
import ReactDOM from 'react-dom';
import Browser from './components/Browser';
import DataAdapter from './helpers/DataAdapter';

const tempLiveData = require('./stores/derived-db-data');

const isLocalhost = window.location.hostname === 'localhost';
const liveDataFlagIsSet = window.location.search.indexOf('live=1') !== -1;
const shouldUseLiveData = ( !isLocalhost || liveDataFlagIsSet );

const tabSeparatesTemplates = shouldUseLiveData ? tempLiveData.live : tempLiveData.dev ;

const templateData = new DataAdapter(tabSeparatesTemplates);

/*
  Required options:
    divId: (string) id of the div that will house the browser
    onTemplateOpen: (function(templateId)) function to call when opening a template it
      will recieve the following:
        templateId: (int) the id of the template opened
        templateTypeString: (string) the type of template. Eg: 'TextOnly'
    userType: (string) one of 'guest', 'Free', 'Personal', 'Expert', 'Business', 'Enterprise', 'Pay As You Go', 'Reseller'
*/
function initTemplateBrowser (options) {
  ReactDOM.render(
    <Browser templates={ templateData.getList() }
      userType={ options.userType }
      onTemplateOpen={ options.onTemplateOpen } />,
    document.getElementById(options.divId)
  );
}

window.initTemplateBrowser = initTemplateBrowser;