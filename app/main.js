import React from 'react';
import ReactDOM from 'react-dom';

import Root from './router';
import WSController from './core/WSController';
import CompositionController from './core/CompositionController';

import utils from './core/utils';
import adrs from './core/addresses';

import './style/fonts.styl';
import './style/base.styl';

// Enable react dev-tools (https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
window.React = React;

const WSCtrl = new WSController();
const compositionCtrl = new CompositionController(); // TODO use alt.js

/**
 * #########################
 * WEB SOCKET CONTROLLER
 * #########################
 */
compositionCtrl.onCompositionUpdated((composition) => {
  WSCtrl.send(adrs.GALLERY_UPDATE_COMPOSITION, composition);
});

WSCtrl.on(adrs.SERVER_CONNECTED, () => {
  console.log('WebSocket Client Connected');
  utils.emitter.emit(adrs.SERVER_CONNECTED);
});

WSCtrl.on(adrs.SERVER_DISCONNECTED, () => {
  console.log('echo-protocol Client Closed');
  utils.emitter.emit(adrs.SERVER_DISCONNECTED);
});

WSCtrl.on(adrs.GALLERY_COMPOSITIONS, (compositions) => {
  compositionCtrl.setCompositions(compositions);
});

WSCtrl.on(adrs.GALLERY_NEW_COMPOSITION, (composition) => {
  compositionCtrl.pushComposition(composition);
});

/**
 * #########################
 * INIT
 * #########################
 */
WSCtrl.init();
ReactDOM.render(<Root />, app);
