import React, { Component } from 'react';

import utils from '../core/utils';
import adrs from '../core/addresses';

import Alert from '../components/Alert/Alert';

export default class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alertMessage: {
        title: 'Connection...',
        content: '',
      },
    };

    this._onServerConnected = this._onServerConnected.bind(this);
    this._onServerDisconnected = this._onServerDisconnected.bind(this);
  }
  componentDidMount() {
    utils.emitter.addListener(adrs.SERVER_CONNECTED, this._onServerConnected);
    utils.emitter.addListener(adrs.SERVER_DISCONNECTED, this._onServerDisconnected);
  }

  _onServerConnected() {
    this.setState({ alertMessage: { title: false, content: false } });
  }

  _onServerDisconnected() {
    this.setState({ alertMessage: { title: 'Server Disconnected', content: 'Please make sure  sure the server is started and refresh to reconnect.' } });
  }

  render() {
    return (
      <div id="layout" ref="layout" className="_layout">
        <div className="_content">
            { this.props.children }
        </div>

        <Alert message={this.state.alertMessage} />

      </div>
    );
  }
}
Layout.propTypes = { children: React.PropTypes.node };
