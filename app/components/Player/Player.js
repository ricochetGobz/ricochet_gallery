import React, { Component } from 'react';

import './Player.styl';
import '../_Button/_Button.styl';

export default class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      played: false,
    };

    this._togglePlayer = this._togglePlayer.bind(this);
  }

  componentDidMount() {
  }

  componentWillUnmount() {}

  _togglePlayer() {
    const played = !this.state.played;
    if (played) {
      // Show jacket
    } else {
      // Hide jacket
    }
    this.setState({ played });
  }

  render() {
    const timer = this.state.played ? <span className="Player-timer">0:00</span> : false;

    return (
      <div className="Player">
        <div className="Player-render _frame _frame_purple">
          <div className="Player-overlay" onClick={this._togglePlayer}>
            <div className="Player-button">
              <span
              className={`Button Button${this.state.played ? '_pause' : '_play'}`}
              />
            </div>
          </div>

          {timer}

        </div>
        <div className="Player-partition  _frame _frame_purple"></div>
      </div>
    );
  }
}

Player.propTypes = {
  params: React.PropTypes.object,
};
