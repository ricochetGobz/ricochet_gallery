import adrs from './addresses';
import utils from './utils';

export default class CompositionController {
  constructor() {
    this._compositions = [];

    utils.emitter.addListener(adrs.GET_COMPOSITIONS, this.sendCompositions.bind(this));
    utils.emitter.addListener(adrs.GET_COMPOSITION, (id) => this.sendComposition(id));
  }

  setCompositions(compositions) {
    this._compositions = compositions;
    this.sendCompositions();
  }

  pushComposition(composition) {
    this._compositions.push(composition);
    utils.emitter.emit(adrs.SEND_NEW_COMPOSITION, this._compositions, composition.id);
  }

  sendCompositions() {
    utils.emitter.emit(adrs.SEND_COMPOSITIONS, this._compositions);
  }

  sendComposition(id) {
    for (const composition of this._compositions) {
      if (composition.id === id) {
        utils.emitter.emit(adrs.SEND_COMPOSITION, composition);
        return;
      }
    }

  console.warn(`CompositionController.postComposition() ERROR :
    Composition ${id} was not found`);
  }

}
