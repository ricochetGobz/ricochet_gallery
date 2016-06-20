import TweenMax from 'gsap';
import Animations from './Animations';

export default class PixiPlayer {

  /**
   * [Experiment contructor]
   * - Extends PIXI.Container
   * @return void
   */

  constructor() {

    this.stage = new PIXI.Container(0xffffff);
    this.renderer = new PIXI.WebGLRenderer( 400, 400,{antialias: true});
    this.renderer.backgroundColor = 0xffffff;
    this.renderer.view.className = 'playerpixi';

    this.sounds = [];
    this.colors = [0xFB78A4, 0x123456, 0x654321, 0xABCDEF, 0xFEDCBA, 0xAABBCC];

    for (var i = 1; i <= 6; i++) {
      this.sounds[i] = new PIXI.Graphics();
      this.sounds[i].beginFill(this.colors[i - 1]);
      this.sounds[i].position.x = 0;
      this.sounds[i].position.y = 0;
      this.sounds[i].alpha = 0;
      this.sounds[i].drawCircle(10, 10, 5);
      this.stage.addChild(this.sounds[i]);
    }




    this.animations = new Animations();

    // for (var i = 0; i < 6; i++) {
    //   this.sounds[i] = animations.createAnim()
    //   this.sounds[i].beginFill(this.colors[i]);
    //   this.sounds[i].position.x = 0;
    //   this.sounds[i].position.y = 0;
    //   this.sounds[i].alpha = 0;
    //   this.sounds[i].drawCircle(10, 10, 5);
    //   this.stage.addChild(this.sounds[i]);
    // }

  }

  play(data) {
    if (!this.tl) this.createTimeline(data.timeline);
    else this.tl.play();
    for ( var i = 1; i <= this.length; i++ ) {
      if (this.sprites[i].isPlaying) this.sprites[i].movieclip.play();
    }
  }

  stop() {
    this.tl.stop();
    for ( var i = 1; i <= this.length; i++ ) {
      if (this.sprites[i].isPlaying) this.sprites[i].movieclip.stop();
    }
  }

  pause() {
    this.tl.pause();
    for ( var i = 1; i <= this.length; i++ ) {
      if (this.sprites[i].isPlaying) this.sprites[i].movieclip.stop();
    }
  }

  restart() {
    this.tl.restart();
  }

  show() {

  }

  hide() {

  }

  createTimeline(data) {
    console.log(data);
    this.length = data.length;
    this.tl = new TimelineMax();

    this.sprites = [];
    for ( var i = 1; i <= data.length; i++ ) {
      let posx = (data[i - 1].position.x * 400) / 800,
          posy = this.sounds[data[i - 1].sound].position.y = (data[i - 1].position.y * 400) / 600;
      // console.log(this.sounds[data[i - 1].sound].position.x)
      let delay = 0;
      if (i > 1) delay = parseInt(data[i - 1].createdAt.sec) - parseInt(data[i - 2].createdAt.sec) - (i - 2) * 3.4;
      let anim = {
        movieclip : this.animations.createAnim(data[i - 1].sound , posx, posy),
        delay : delay,
        isPlaying : false
      };
      this.stage.addChild(anim.movieclip);
      anim.movieclip.alpha = 0;
      anim.movieclip.stop();
      this.sprites[i] = anim;
    }

    for ( var i = 1; i <= data.length; i++ ) {
      this.sounds[data[i - 1].sound].position.x = (data[i - 1].position.x * 400) / 800;
      this.sounds[data[i - 1].sound].position.y = (data[i - 1].position.y * 400) / 600;
      console.log(this.sounds[data[i - 1].sound].position.x)
      let delay = 0;

      if (i > 1) delay = parseInt(data[i - 1].createdAt.sec) - parseInt(data[i - 2].createdAt.sec) - i * 3.4;
      let anim = this.sprites[i];
        this.tl.to(this.sprites[i].movieclip, .2, {delay: this.sprites[i].delay, alpha: 1, onComplete:() => {
        anim.movieclip.play();
        anim.isPlaying = true;
      }});
      this.tl.to(this.sprites[i].movieclip, .2, {delay:3, alpha: 0, onStart:() => {
        anim.isPlaying = false;
      }});
      console.log(data[i - 1]);
    }

  }
}
