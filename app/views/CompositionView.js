import React, { Component } from 'react';

import adrs from '../core/addresses';
import utils from '../core/utils';

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

  render() {
    let composition;
    if (this.state.composition) {
      composition = <h1>Composition {this.state.composition.name}</h1>;
    }
    return (
      <section className="_content">
        {composition}
      </section>
    );
  }
}

CompositionView.propTypes = {
  params: React.PropTypes.object,
};
