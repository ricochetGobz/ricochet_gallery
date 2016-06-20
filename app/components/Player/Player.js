import React, { Component } from 'react';
import { pixi as Pixi } from 'pixi.js';
import TweenMax from 'gsap';

import PixiPlayer from './PixiPlayer';

import './Player.styl';
import '../_Button/_Button.styl';
import partitionUrl from '../../assets/imgs/partition.jpg';
;
export default class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      played: false,
    };

    this._togglePlayer = this._togglePlayer.bind(this);
  }

  update() {
    this.player.renderer.render( this.player.stage );
  }

  componentDidMount() {

    this.player = new PixiPlayer();
    this.function = this.update.bind(this);
    document.getElementsByClassName('Player-render')[0].insertBefore( this.player.renderer.view, document.getElementsByClassName('Player-render')[0].firstChild );
    TweenMax.ticker.addEventListener( 'tick', this.function);

  }

  componentWillUnmount() {
    TweenMax.ticker.removeEventListener( 'tick', this.function);
  }

  _togglePlayer() {
    const played = !this.state.played;
    if (played) {
      // Show jacket
      this.player.play(this.props);
    } else {
      // Hide jacket
      this.player.pause();
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
        <div className="Player-partition  _frame _frame_purple">
          <img src={partitionUrl} alt="partition"/>
        </div>
      </div>
    );
  }
}

Player.propTypes = {
  timeline: React.PropTypes.array,
};
