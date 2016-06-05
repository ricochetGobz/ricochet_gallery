import React, { Component } from 'react';

import _DateDiff from '../_DateDiff/_DateDiff';

import './Composition.styl';
import jacketImage from '../../assets/imgs/jacket.jpg';

export default class Composition extends Component {

  render() {
    const title = this.props.data.title ?
     this.props.data.title :
     `Compo ${this.props.data.id}`
    ;

    return (
      <li className="Composition" onClick={() => this.props.linkToComposition(this.props.data.id)} >
        <header className="Composition-header">
          <div className="Composition-detail">
            <h3 className="Composition-title">{title}</h3>
            <p className="Composition-author">{this.props.data.author}</p>
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
  linkToComposition: React.PropTypes.function,
};
