import React, { Component } from 'react';

import './Player.styl';
import '../_Button/_Button.styl';

export default class Player extends Component {

  componentDidMount() {}

  componentWillUnmount() {}

  _togglePlayer() {
    console.log('_togglePlayer');
  }

  render() {
    return (
      <div className="Player">
        <div className="Player-render  _frame _frame_purple">
          <div className="Player-overlay" onClick={this._togglePlayer}>
            <span className="Player-button Button Button_play" />
          </div>
          <span className="Player-timer">0:00</span>
        </div>
        <div className="Player-partition  _frame _frame_purple"></div>
      </div>
    );
  }
}

Player.propTypes = {
  params: React.PropTypes.object,
};
