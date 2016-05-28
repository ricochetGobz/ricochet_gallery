/**
*
* app/core/utils.js
* All of your utils functions
*
**/

import { EventEmitter } from 'fbemitter';

import adrs from './addresses';

const util = {
  isJSON: (str) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  },
  addressExist: (adr) => {
    for (const key in adrs) {
      if (adrs[key] === adr) return true;
    }
    return false;
  },
  emitter: new EventEmitter(),
};

module.exports = util;
