import React, { Component } from 'react';

import './Annotation.styl';

export default class Annotation extends Component {

  componentDidMount() {}

  render() {
    return (
      <div className="Annotation _frame _frame_blue">
        <h3 className="Annotation-title">Annotation</h3>
        <p className="Annotation-paragraph"> Il est possible de scanner le code
          afin d'enregistrer la composition sur l'application
          <strong> RICOCHET.</strong>
        </p>
      </div>
    );
  }
}
