import React from 'react';
import ReactDOM from 'react-dom';

import Root from './router';
import WSController from './core/WSController';
import adrs from './core/addresses';

// Enable react dev-tools (https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
window.React = React;

const WSCtrl = new WSController();

WSCtrl.on(adrs.SERVER_CONNECTED, () => {
  console.log('WebSocket Client Connected');
});

WSCtrl.on(adrs.SERVER_DISCONNECTED, () => {
  console.log('echo-protocol Client Closed');
});

WSCtrl.on(adrs.GALLERY_COMPOSITIONS, (compositions) => {
  console.log('composition receives', compositions);
  // TODO show positions
});

WSCtrl.on(adrs.GALLERY_NEW_COMPOSITION, (composition) => {
  console.log('composition receives', composition);
  // TODO popup message
  // TODO add composition
});

/**
 * #########################
 * INIT
 * #########################
 */
WSCtrl.init();
ReactDOM.render(<Root />, app);
