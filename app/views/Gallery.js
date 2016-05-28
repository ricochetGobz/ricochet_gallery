import React, { Component } from 'react';

import adrs from '../core/addresses';
import utils from '../core/utils';
import Composition from '../components/Composition/Composition';

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
    this.setState({ compositions });
  }

  render() {
    return (
      <section className="Gallery _content">
        <h1>Gallery</h1>

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
