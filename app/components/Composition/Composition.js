import React, { Component } from 'react';

import CodeGenerator from '../../core/CodeGenerator';

import _DateDiff from '../_DateDiff/_DateDiff';

import './Composition.styl';
import '../_Gradient/_Gradient.styl';


export default class Composition extends Component {
  constructor(props) {
    super(props);
    this.code = false;

    this._randomize = this._randomize.bind(this);
  }

  componentDidMount() {
    this.code = new CodeGenerator(this.refs.jacket, this.props.data.id);
    this.code.drawLines();
  }

  _randomize() {
    this.code.randomize();
  }

  render() {
    const title = this.props.data.title ?
     this.props.data.title :
     `Compo ${this.props.data.id}`
    ;

    return (
      <li className="Composition"
        onClick={() => this.props.linkToComposition(this.props.data.id)}
        onMouseEnter={this._randomize}
      >
        <header className="Composition-header">
          <div className="Composition-detail">
            <h3 className="Composition-title">{title}</h3>
            <p className="Composition-author">{this.props.data.author}</p>
          </div>
          <_DateDiff createdAt={this.props.data.createdAt} />
        </header>
        <section ref="jacket" className="Composition-jacket">
          <div className="Composition-overlay"></div>
        </section>
      </li>
    );
  }
}

Composition.propTypes = {
  data: React.PropTypes.object,
  linkToComposition: React.PropTypes.function,
};
