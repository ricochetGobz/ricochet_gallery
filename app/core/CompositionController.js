import adrs from './addresses';
import utils from './utils';

export default class CompositionController {
  constructor() {
    this._compositions = [];

    this._callbackSendUpdateComposition = false;

    utils.emitter.addListener(adrs.GET_COMPOSITIONS, this._sendCompositions.bind(this));
    utils.emitter.addListener(adrs.GET_COMPOSITION, (id) => this.sendComposition(id));
    utils.emitter.addListener(adrs.UPDATE_COMPOSITION, (id, title, author) => this.updateComposition(id, title, author));
  }

  setCompositions(compositions) {
    this._compositions = compositions;
    this._sendCompositions();
  }

  pushComposition(composition) {
    this._compositions.unshift(composition);
    utils.emitter.emit(adrs.SEND_NEW_COMPOSITION, this._compositions, composition.id);
  }

  _sendCompositions() {
    utils.emitter.emit(adrs.SEND_COMPOSITIONS, this._compositions);
  }

  sendComposition(id) {
    if (typeof id === 'string') {
      console.error(`CompositionController.sendComposition() ERROR : id param is a string => ${id}`);
      return;
    }

    for (const composition of this._compositions) {
      if (composition.id === id) {
        utils.emitter.emit(adrs.SEND_COMPOSITION, composition);
        return;
      }
    }

  console.warn(`CompositionController.postComposition() ERROR :
    Composition ${id} was not found`);
  }

  updateComposition(compositionId, title, author) {
    for (const composition of this._compositions) {
      if (composition.id === compositionId) {
        composition.author = author;
        composition.title = title;
        this._callbackSendUpdateComposition(composition);
        this._sendCompositions();
        return;
      }
    }
  }

  onCompositionUpdated(callback) {
    this._callbackSendUpdateComposition = callback;
  }

}
