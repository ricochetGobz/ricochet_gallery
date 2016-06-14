import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import adrs from '../../core/addresses';
import utils from '../../core/utils';

import Composition from '../../components/Composition/Composition';
import Annotation from '../../components/_Annotation/_Annotation';
import Popup from '../../components/Popup/Popup';

import './Gallery.styl';

export default class Gallery extends Component {
  constructor(props) {
    super(props);

    this._subscriptions = [];
    this.state = {
      compositions: [],
      newCompositionId: -1,
      annotationOppenned: true,
    };

    this._linkToComposition = this._linkToComposition.bind(this);
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

  _onNewCompositionReceived(compositions, newCompositionId) {
    console.log('New composition received');
    this.setState({ compositions, newCompositionId });
  }

  _linkToComposition(id) {
    browserHistory.push(`/gallery/composition/${id}`);
  }

  render() {
    return (
      <section className="Gallery _wrapper">

        <Annotation
          className="Gallery-annotation"
          open={this.state.annotationOppenned}
          title="Annotation"
        >
           Il est possible de scanner le code
            afin d'enregistrer la composition sur l'application
            <strong> RICOCHET.</strong>
        </Annotation>

        <header className="Gallery-header">
          <h1 className="Gallery-title" ref="title">Sonothèque</h1>
        </header>

        <ul className="Gallery-compositions">
          {
            this.state.compositions.map((composition) =>
              <Composition data={composition} key={composition.id} linkToComposition={this._linkToComposition} />
            )
          }
        </ul>

        <Popup newCompositionId={this.state.newCompositionId} />
      </section>
    );
  }
}
