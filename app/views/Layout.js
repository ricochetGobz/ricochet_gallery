import React, { Component } from 'react';

export default class Layout extends Component {

  componentDidMount() {}

  render() {
    return (
      <div id="layout" ref="layout" className="_layout">
        <div className="_content">
            { this.props.children }
        </div>
      </div>
    );
  }
}
Layout.propTypes = { children: React.PropTypes.node };
