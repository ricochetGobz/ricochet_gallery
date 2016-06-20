import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import TweenMax from 'gsap';

import adrs from '../../core/addresses';
import utils from '../../core/utils';

import Composition from '../../components/Composition/Composition';
import Annotation from '../../components/_Annotation/_Annotation';
import Popup from '../../components/Popup/Popup';

import './Gallery.styl';

export default class Gallery extends Component {
  constructor(props) {
    super(props);

    this._subscriptions = [];
    this.state = {
      compositions: [],
      newCompositionId: -1,
      annotationOppenned: true,
    };

    this.isShown = false;
    this.first = false;

    this._linkToComposition = this._linkToComposition.bind(this);
  }


  componentDidMount() {
    this._subscriptions.push(
      utils.emitter.addListener(adrs.SEND_COMPOSITIONS, this._onCompositionsReceived.bind(this))
    );
    this._subscriptions.push(
      utils.emitter.addListener(adrs.SEND_NEW_COMPOSITION, this._onNewCompositionReceived.bind(this))
    );
    utils.emitter.emit(adrs.GET_COMPOSITIONS);
  }

  componentDidUpdate() {
    // this.isShown = false;
    var compos = document.getElementsByClassName("Composition");
    for (var i = 0; i < compos.length; i++) {
      if (!this.isShown) TweenMax.set(compos[i], {alpha:0});
    }
    this.showGallery();
    console.log("update")
  }

  showGallery() {
    console.log("showGallery");
    if (!this.isShown) {
      var compos = document.getElementsByClassName("Composition");
      var tl = new TimelineMax();
      for (var i = 0; i < compos.length; i++) {
        var compo = compos[i];
        let delay = - 0.3;
        if (i == 0) delay = 0.5;
        tl.fromTo(compo, .4, {alpha:0}, {alpha:1, delay: delay});
        console.log(compo.y)
        tl.fromTo(compo, .4, {y:"+=10"}, {y:"-=10", delay: - 0.4});
      }
      tl.play();
      this.isShown = true;
    }
  }

  hideGallery(id) {
    if (this.isShown) {
      var compos = document.getElementsByClassName("Composition");
      var tl = new TimelineMax();
      for (var i = 0; i < compos.length; i++) {
        if(i != id) {
          var compo = compos[i];
          let delay = - 0.3;
          if (i == 0) delay = 0.5;
          tl.fromTo(compo, .4, {alpha:1}, {alpha:0, delay: delay});
          console.log(compo.y)
          tl.to(compo, .4, {y:"+=10", delay: - 0.4});
        }
      }
      tl.play();
      this.isShown = false;
    }
  }

  componentWillUnmount() {
    // remove emitter listeners
    for (let i = 0; i < this._subscriptions.lenght; i++) {
      this._subscriptions[i].remove();
      delete this._subscriptions[i];
    }
  }

  _onCompositionsReceived(compositions) {
    console.log('Compositions received');
    this.setState({ compositions });

    // this.isShown = false;
    // if (!this.first) {
    //   console.log("first");
    // //   this.hideGallery();
    // //   this.showGallery();
    // var compos = document.getElementsByClassName("Composition");
    // for (var i = 0; i < compos.length; i++) {
    //   TweenMax.set(compo[i], {alpha:0});
    // }
    //   this.first = true;
    // }

  }

  _onNewCompositionReceived(compositions, newCompositionId) {
    console.log('New composition received');
    this.setState({ compositions, newCompositionId });
  }

  _linkToComposition(id) {

    let compo = document.getElementsByClassName("Gallery-compositions")[0].children[id];
    console.log(compo);
    let isPushed = false;
    this.hideGallery(id);
    TweenMax.to(compo, .4, {delay: .4, transform:"scale(6)", ease:Linear.easeNone});
    TweenMax.to(compo, .4, {delay: .4, y:"+=10"});
    TweenMax.to(compo, .4, {delay: .4, alpha:0, ease:Linear.easeNone, onUpdate:() => {
      if (compo.style.opacity < .02 && !isPushed) {
        browserHistory.push(`/gallery/composition/${id}`);
        isPushed = true;
      }
    }});
  }

  render() {
    return (
      <section className="Gallery _wrapper">

        <Annotation
          className="Gallery-annotation"
          open={this.state.annotationOppenned}
          title="Annotation"
        >
           Il est possible de scanner le code
            afin d'enregistrer la composition sur l'application
            <strong> RICOCHET.</strong>
        </Annotation>

        <header className="Gallery-header">
          <h1 className="Gallery-title" ref="title">Sonothèque</h1>
        </header>

        <ul className="Gallery-compositions">
          {
            this.state.compositions.map((composition) =>
              <Composition data={composition} key={composition.id} linkToComposition={this._linkToComposition} />
            )
          }
        </ul>

        <Popup newCompositionId={this.state.newCompositionId} />
      </section>
    );
  }
}
