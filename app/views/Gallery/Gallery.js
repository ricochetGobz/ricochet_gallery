import React, { Component } from 'react';

import adrs from '../../core/addresses';
import utils from '../../core/utils';

import Composition from '../../components/Composition/Composition';
import Annotation from '../../components/Annotation/Annotation';

import './Gallery.styl';

export default class Gallery extends Component {
  constructor(props) {
    super(props);

    this._subscriptions = [];
    this.state = {
      compositions: [],
    };
  }


  componentDidMount() {
    this._subscriptions.push(
      utils.emitter.addListener(adrs.SEND_COMPOSITIONS, this._onCompositionsReceived.bind(this))
    );
    this._subscriptions.push(
      utils.emitter.addListener(adrs.SEND_NEW_COMPOSITION, this._onNewCompositionReceived.bind(this))
    );
    utils.emitter.emit(adrs.GET_COMPOSITIONS);
  }

  componentWillUnmount() {
    // remove emitter listeners
    for (let i = 0; i < this._subscriptions.lenght; i++) {
      this._subscriptions[i].remove();
      delete this._subscriptions[i];
    }
  }

  _onCompositionsReceived(compositions) {
    console.log('Compositions received');
    this.setState({ compositions });
  }
  _onNewCompositionReceived(newCompositions, compositionId) {
    console.log('New composition received');
    this.setState({ compositions: newCompositions });

    // TODO afficher la pop up pour enregistrer les données de la nouvelle compo.
  }

  render() {
    const c = this.state.compositions.map((composition) =>
      <Composition data={composition} key={composition.id} />
    );
    return (
      <section className="Gallery _wrapper">

        <Annotation />
        <header className="Gallery-header">
          <h1 className="Gallery-title" ref="title">Sonothèque</h1>
        </header>

        <ul className="Gallery-compositions">
          {
            this.state.compositions.map((composition) =>
              <Composition data={composition} key={composition.id} />
            )
          }
        </ul>

      </section>
    );
  }
}
