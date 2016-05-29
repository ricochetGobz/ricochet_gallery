import React, { Component } from 'react';

import utils from '../../core/utils';

import './_DateDiff.styl';

export default class Composition extends Component {

  componentDidMount() {}

  _getDateDiff(date) {
    let duration = '';
    const dateDiff = utils.dateDiff(new Date(date), new Date());
    if (dateDiff.day > 0) {
      duration = `${dateDiff.day} day(s) ago`;
    } else if (dateDiff.hour > 0) {
      duration = `${dateDiff.hour} hour(s) ago`;
    } else if (dateDiff.min > 0) {
      duration = `${dateDiff.min} min(s) ago`;
    } else if (dateDiff.sec > 2) {
      duration = `${dateDiff.sec} sec(s) ago`;
    } else {
      duration = 'just now';
    }
    return duration;
  }

  render() {
    return <span className="DateDiff">{this._getDateDiff(this.props.createdAt)}</span>;
  }
}

Composition.propTypes = {
  createdAt: React.PropTypes.string,
};
