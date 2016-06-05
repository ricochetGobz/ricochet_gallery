import React, { Component } from 'react';
import { TimelineLite } from 'gsap';
import './Popup.styl';

export default class Popup extends Component {

  constructor(props) {
    super(props);

    this.openned = false;
    this._newCompositionId = -1;
    this.openCloseTimeline = null;

    this._close = this._close.bind(this);
    this._save = this._save.bind(this);
  }

  componentDidMount() {
    this.openCloseTimeline = new TimelineLite({
      paused: true,
      onComplete: () => { this.openned = true; },
      onReverseComplete: () => this.refs.popup.classList.add('Popup_hidden'),
    });
    this.openCloseTimeline.to(this.refs.popup, 0.2, { opacity: 1 });
    this.openCloseTimeline.to(this.refs.wrapper, 0.3, { top: '50%' }, '-=0.2');
  }

  componentDidUpdate() {
    const newCompositionId = this.props.newCompositionId;
    if (newCompositionId !== -1 && newCompositionId !== this._newCompositionId) {
      this._newCompositionId = newCompositionId;
      this._open();
    }
  }

  _open() {
    console.log('open popup');
    if (this.openned) {
      console.log('restart');
      this.openCloseTimeline.restart();
    } else {
      this.refs.popup.classList.remove('Popup_hidden');
      this.openCloseTimeline.play();
      this.openned = true;
    }
  }

  _close() {
    console.log('close popup');
    this.openned = false;
    this.openCloseTimeline.reverse();
  }

  _save() {
    // TODO save new values of composition into server.
    console.log('save new values');
    this._close();
  }

  render() {
    return (
      <div ref="popup" className="Popup Popup_hidden">

        <div ref="wrapper" className="Popup-wrapper _frame _frame_dark">
          <div className="Popup-content">
            <header className="Popup-header">
              <p>une nouvelle</p>
              <h1>PARTITION</h1>
              <p>a été réalisée</p>
            </header>

            <form action="#" className="Popup-form Form">
              <div className="Form-input">
                <input type="text" placeholder="Nom de la partition" />
              </div>
              <div className="Form-input Form-input_author">
                <input type="text" placeholder="Auteur de la composition" />
              </div>
              <button className="Button Button_green" onClick={this._save} >Valider</button>
            </form>
          </div>

          <button className="Button Button_close" onClick={this._close} />
        </div>

      </div>
    );
  }
}

Popup.propTypes = {
  newCompositionId: React.PropTypes.number,
};
