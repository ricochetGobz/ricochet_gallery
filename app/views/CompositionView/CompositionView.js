import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import adrs from '../../core/addresses';
import utils from '../../core/utils';
import _DateDiff from '../../components/_DateDiff/_DateDiff';
import Player from '../../components/Player/Player';
import '../../components/_Form/_Form.styl';

import './CompositionView.styl';
import iconPhoneImage from '../../assets/imgs/iconNote.png';


export default class CompositionView extends Component {
  constructor(props) {
    super(props);

    this._subscriptions = [];
    this.state = {
      composition: false,
    };

    this._onAllCompositionsReceived = this._onAllCompositionsReceived.bind(this);
    this._onCompositionReceived = this._onCompositionReceived.bind(this);
  }

  componentDidMount() {
    this._subscriptions.push(
      utils.emitter.addListener(adrs.SEND_COMPOSITION, this._onCompositionReceived)
    );
    this._subscriptions.push(
      utils.emitter.addListener(adrs.SEND_COMPOSITIONS, this._onAllCompositionsReceived)
    );
  }

  componentWillUnmount() {}

  _onCompositionReceived(composition) {
    console.log('composition received', composition);
    this.setState({ composition });
  }

  _onAllCompositionsReceived() {
    utils.emitter.emit(adrs.GET_COMPOSITION, parseInt(this.props.params.id, 10));
  }

  _close() {
    console.log('close');
    browserHistory.push('/gallery/');
  }

  render() {
    const title = this.state.composition.title ?
     this.state.composition.title :
     `Compo ${this.props.params.id}`
    ;

    const author = this.state.composition.author ?
      <p className="CompositionView-author">
        posté par <span>{this.state.composition.author}</span>
      </p> :
      false
    ;

    return (
      <section className="CompositionView _wrapper">

        <section className="CompositionView-column_left">
          <Player timeline={this.state.composition.timeline} />
        </section>

        <section className="CompositionView-column_right">
          <div className="CompositionView-dateDiff">
            <_DateDiff createdAt={this.state.composition.createdAt} />
          </div>
          <h1 className="CompositionView-title">{title}</h1>

          {author}

          <div className="CompositionView-info _frame _frame_purple Form">
            <p className="CompositionView-paragraph"> Il est possible de scanner le code
            afin d'enregistrer la composition sur l'application
            <strong> RICOCHET.</strong></p>
            <img className="Composition-icon Composition-icon_note"
              src={iconPhoneImage}
              alt="Note icon"
            />
          </div>
          <form action="" className="CompositionView-form Form">
            <label className="Form-label" htmlFor="mail">Recevoir la partitions ?</label>
            <div className="Form-input Form-input_mail">
              <input type="text" placeholder="Adresse mail" />
            </div>
            <button className="Button Button_green">Envoyez</button>
            <button className="Button">Imprimer</button>
          </form>
        </section>

        <button className="Button Button_close" onClick={this._close} />
      </section>
    );
  }
}

CompositionView.propTypes = {
  params: React.PropTypes.object,
};
