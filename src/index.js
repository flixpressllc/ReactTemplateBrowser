import React from 'react';
import ReactDOM from 'react-dom';
import Browser from './components/Browser';
import DataAdapter from './helpers/DataAdapter';

const isLocalhost = window.location.hostname === 'localhost';
const liveDataFlagIsSet = window.location.search.indexOf('live=1') !== -1;
const shouldUseLiveData = ( !isLocalhost || liveDataFlagIsSet );

const fileForData = shouldUseLiveData ? 'liveTemplateData.txt' : 'testingTemplateData.txt' ;

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
  window.$.ajax({
    url:'/Scripts/ReactTemplateBrowser/' + fileForData,
    dataType: 'text'
  }).done(function (data) {
    const templateData = new DataAdapter(data);
    ReactDOM.render(
      <Browser templates={ templateData.getAll() }
        userType={ options.userType }
        preferredCostType={ options.preferredCostType }
        onTemplateOpen={ options.onTemplateOpen } />,
      document.getElementById(options.divId)
    );
  })
}

window.initTemplateBrowser = initTemplateBrowser;
