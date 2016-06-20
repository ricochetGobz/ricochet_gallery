const nbrOfNotes = 6;
// const nbrOfSprites = 1;
const nbrOfSprites = 78;
let animations = [];

export default class SpritesheetFactory {

  /**
   * [Experiment contructor]
   * @return void
   */

  constructor() {

    let i, j;
    for (i = 1; i <= nbrOfNotes; i++) {
      animations[i] = [];

      // Load images
      for (j = 0; j < nbrOfSprites; j++) {
        // animations[i].push(
        let anim = PIXI.Texture.fromImage(require(`../../assets/imgs/son_0${i}/son_0${i}_000${j}.png`));
        console.log(anim);
        animations[i].push(anim);
        // );
      }
    }

  }

  createAnim(id, x, y) {

    console.log(animations);
    console.log(id, animations[id])
    const animNote = new PIXI.extras.MovieClip(animations[id]);

    animNote.position.x = x;
    animNote.position.y = y;

    animNote.anchor.x = 0.5;
    animNote.anchor.y = 0.5;
    animNote.loop = false;
    animNote.animationSpeed = .5;
    animNote.scale.x = 1.35;
    animNote.scale.y = 1.35;

    animNote.rotation = Math.random() * Math.PI;

    animNote.play();

    return animNote;
  }

}
