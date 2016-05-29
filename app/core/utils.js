/**
*
* app/core/utils.js
* All of your utils functions
*
**/

import { EventEmitter } from 'fbemitter';

import adrs from './addresses';

const util = {
  emitter: new EventEmitter(),
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
  // http://www.finalclap.com/faq/88-javascript-difference-date
  dateDiff: (date1, date2) => {
    const diff = {};
    let tmp = date2 - date1;

    tmp = Math.floor(tmp / 1000);
    diff.sec = tmp % 60;

    tmp = Math.floor((tmp - diff.sec) / 60);
    diff.min = tmp % 60;

    tmp = Math.floor((tmp - diff.min) / 60);
    diff.hour = tmp % 24;

    tmp = Math.floor((tmp - diff.hour) / 24);
    diff.day = tmp;

    return diff;
  },
};

module.exports = util;
