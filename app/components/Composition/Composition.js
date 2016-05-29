import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import _DateDiff from '../_DateDiff/_DateDiff';

import './Composition.styl';
import jacketImage from '../../assets/imgs/jacket.jpg';
import iconNoteImage from '../../assets/imgs/iconNote.png';

export default class Composition extends Component {

  componentDidMount() {}

  _linkToComponent(id) {
    browserHistory.push(`/gallery/composition/${id}`);
  }

  render() {
    return (
      <li className="Composition" onClick={() => this._linkToComponent(this.props.data.id)}>
        <header className="Composition-header">
          <div className="Composition-description">
            <img className="Composition-icon Composition-icon_note"
              src={iconNoteImage}
              alt="Note icon"
            />
            <div className="Composition-detail">
              <h3 className="Composition-title">{this.props.data.title}</h3>
              <p className="Composition-author">{this.props.data.author}</p>
            </div>
          </div>
          <_DateDiff createdAt={this.props.data.createdAt} />
        </header>
        <section className="Composition-jacket">
          <div className="Composition-overlay"></div>
          <img className="Composition-image" src={jacketImage} alt="Composition jacket" />
        </section>
      </li>
    );
  }
}

Composition.propTypes = {
  data: React.PropTypes.object,
};
