import React, { Component } from 'react';

import utils from '../../core/utils';

import './Annotation.styl';
import iconPhoneImage from '../../assets/imgs/iconNote.png';


export default class Annotation extends Component {

  componentDidMount() {}

  render() {
    return (
      <div className="Annotation _frame">
        <header className="Annotation-header">
          <img className="Composition-icon Composition-icon_note"
            src={iconPhoneImage}
            alt="Note icon"
          />
          <h3 className="Annotation-title">Annotation</h3>
        </header>
        <p className="Annotation-paragraph"> Il est possible de scanner le code
          afin d'enregistrer la composition sur l'application
          <strong> RICOCHET.</strong>
        </p>
      </div>
    );
  }
}

// Annotation.propTypes = {
//   data: React.PropTypes.object,
// };
