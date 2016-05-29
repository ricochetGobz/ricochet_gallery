import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import adrs from '../../core/addresses';
import utils from '../../core/utils';
import _DateDiff from '../../components/_DateDiff/_DateDiff';
import Player from '../../components/Player/Player';

import './CompositionView.styl';
import iconPhoneImage from '../../assets/imgs/iconNote.png';


export default class CompositionView extends Component {
  constructor(props) {
    super(props);

    this._subscriptions = [];
    this.state = {
      composition: false,
    };
  }

  componentDidMount() {
    this._subscriptions.push(
      utils.emitter.addListener(adrs.SEND_COMPOSITION, this._onCompositionReceived.bind(this))
    );
    this._subscriptions.push(
      utils.emitter.addListener(adrs.SEND_COMPOSITIONS, this._onCompositionsReceived.bind(this))
    );
    utils.emitter.emit(adrs.GET_COMPOSITION, this.props.params.id);
  }

  componentWillUnmount() {}

  _onCompositionReceived(composition) {
    this.setState({ composition });
  }

  _onCompositionsReceived() {
    utils.emitter.emit(adrs.GET_COMPOSITION, this.props.params.id);
  }

  _close() {
    console.log('close');
    browserHistory.push(`/gallery/`);

  }

  render() {
    return (
      <section className="CompositionView _wrapper">

        <section className="CompositionView-column">
          <Player timeline={this.state.composition.timeline} />
        </section>

        <section className="CompositionView-column">
          <div className="CompositionView-dateDiff">
            <_DateDiff createdAt={this.state.composition.createdAt} />
          </div>
          <h1 className="CompositionView-title">{this.state.composition.title}</h1>
          <p className="CompositionView-author">
            posté par <span>{this.state.composition.author}</span>
          </p>
          <div className="_frame">
            <p className="CompositionView-paragraph"> Il est possible de scanner le code
            afin d'enregistrer la composition sur l'application
            <strong> RICOCHET.</strong></p>
            <img className="Composition-icon Composition-icon_note"
              src={iconPhoneImage}
              alt="Note icon"
            />
          </div>
          <form action="" className="Composition-form">
            <label htmlFor="mail">Recevoir la partitions ?</label>
            <input type="text" className="Composition-input" />
            <button className="Button Button_green">Envoyez</button>
            <button className="Button">Imprimer</button>
          </form>
        </section>

        <button className="Button Button_close" onClick={this._close} />
      </section>
    );
  }
}

CompositionView.propTypes = {
  params: React.PropTypes.object,
};
