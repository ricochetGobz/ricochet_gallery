import React, { Component } from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

import utils from '../../core/utils';

import './Composition.styl';
import jacketImage from '../../assets/imgs/jacket.jpg';
import iconNoteImage from '../../assets/imgs/iconNote.png';

export default class Composition extends Component {

  componentDidMount() {}

  _linkToComponent(id) {
    browserHistory.push(`/gallery/composition/${id}`);
  }

  _getDateDiff(date) {
    let duration = '';
    const dateDiff = utils.dateDiff(new Date(date), new Date());
    if (dateDiff.day > 0) {
      duration = `${dateDiff.day} day(s) ago`;
    } else if (dateDiff.hour > 0) {
      duration = `${dateDiff.hour} hour(s) ago`;
    } else if (dateDiff.min > 0) {
      duration = `${dateDiff.min} min(s) ago`;
    } else if (dateDiff.sec > 2) {
      duration = `${dateDiff.sec} sec(s) ago`;
    } else {
      duration = 'just now';
    }
    return duration;
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
          <span className="Composition-date">{this._getDateDiff(this.props.data.createdAt)}</span>
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
