import React, { Component } from 'react';
import { Link } from 'react-router';

import './Composition.styl';

export default class Composition extends Component {

  componentDidMount() {

  }

  render() {
    return (
      <li className="Composition">
        <Link to={`/gallery/composition/${this.props.data.id}`}>
          <h3 className="Composition-title">{this.props.data.name}</h3>
        </Link>
      </li>
    );
  }
}

Composition.propTypes = {
  data: React.PropTypes.object,
};
