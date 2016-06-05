import React, { Component } from 'react';

import Annotation from '../../components/_Annotation/_Annotation';

import './Alert.styl';

export default class Alert extends Component {

  render() {
    return (
      <div className={`Alert ${this.props.message.title ? '' : 'Alert_hidden'}`}>
        <Annotation
          className="Alert-annotation Annotation_alert"
          open={(typeof this.props.message.title === 'string')}
          title={this.props.message.title}
        >
          { this.props.message.content }
        </Annotation>
      </div>
    );
  }
}

Alert.propTypes = {
  message: React.PropTypes.string,
};
