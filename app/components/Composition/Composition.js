import React, { Component } from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';


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
            <img className="Composition-icon Composition-icon_note" src={iconNoteImage} alt="Note icon" />
            <div className="Composition-detail">
              <h3 className="Composition-title">{this.props.data.title}</h3>
              <p className="Composition-author">{this.props.data.author}</p>
            </div>
          </div>
          <div className="Composition-date">{this.props.data.createdAt}</div>
        </header>

        <img className="Composition-jacket" src={jacketImage} alt="Composition jacket" />
      </li>
    );
  }
}

Composition.propTypes = {
  data: React.PropTypes.object,
};
