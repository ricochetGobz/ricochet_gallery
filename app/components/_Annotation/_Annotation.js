import React, { Component } from 'react';
import { TimelineLite } from 'gsap';

import './_Annotation.styl';

export default class Annotation extends Component {
  constructor(props) {
    super(props);

    this.openned = false;
    this.openCloseTimeline = null;

    this._close = this._close.bind(this);
  }

  componentDidMount() {
    this.openCloseTimeline = new TimelineLite({
      paused: true,
      onComplete: () => { this.openned = true; },
    });
    this.openCloseTimeline.to(this.refs.annotation, 0.5, { ease: Power3.easeOut, opacity: 1, 'margin-top': 0 }, '+=0.6');
    this.openCloseTimeline.to(this.refs.bar, 0.5, { ease: Power3.easeOut, 'width': '50px' }, '-=0.4');

    this._checkStatus();
  }

  componentDidUpdate() {
    this._checkStatus();
  }

  _checkStatus() {
    if (this.props.title) {
      this._open();
    } else {
      this._close();
    }
  }

  _open() {
    this.openned = true;
    this.openCloseTimeline.play();
  }

  _close() {
    this.openned = false;
    this.openCloseTimeline.reverse();
  }

  render() {
    return (
      <div ref="annotation" className={`${this.props.className} Annotation _frame _frame_blue`}>
        <div ref="bar" className="Annotation-bar"></div>
        <h3 className="Annotation-title">{this.props.title}</h3>
        <p className="Annotation-paragraph">{this.props.children}</p>
      </div>
    );
  }
}

Annotation.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  title: React.PropTypes.string,
};
