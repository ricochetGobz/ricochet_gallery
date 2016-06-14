import snap from 'imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js';

export default class CodeGenerator {
  constructor(element, id) {
    this._TAB_WIDTH = 11;
    this._TAB_HEIGHT = 3;
    this._SPACE = 9;
    this._RANDOM_LINE = 0.65;

    this._MIDDLE_SPACE = this._SPACE / 2;
    this._STROKE = this._SPACE * 0.5;
    this._TAB_WIDTH_LENGTH = this._TAB_WIDTH - 1;

    this._lines = [];
    this._gradients = ['Gradient_red', 'Gradient_purple', 'Gradient_green'];

    // INIT ELEMENT
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.id = `code-${id}`;
    this._jacket = element;
    this._jacket.insertBefore( svg, this._jacket.firstChild );
    this._jacketClassName = this._jacket.className;
    this.changeGradient();

    this._code = snap(`#code-${id}`);
    this._code.node.style.width = `${this._TAB_WIDTH * this._SPACE}px`;
    this._code.node.style.height = `${this._TAB_HEIGHT * this._SPACE}px`;
  }

  changeGradient() {
    this._jacket.className =
      `${this._jacketClassName} ${this._gradients[Math.floor(Math.random() * this._gradients.length)]}`
    ;
  }

  setParams(tabWidth, tabHeight, space, randomLine) {
    this._TAB_WIDTH = tabWidth;
    this._TAB_HEIGHT = tabHeight;
    this._SPACE = space;
    this._RANDOM_LINE = randomLine;

    this._MIDDLE_SPACE = this._SPACE / 2;
    this._STROKE = this._SPACE * 0.5;
    this._TAB_WIDTH_LENGTH = this._TAB_WIDTH - 1;

    this._code.clear();
    this._code.node.style.width = `${this._TAB_WIDTH * this._SPACE}px`;
    this._code.node.style.height = `${this._TAB_HEIGHT * this._SPACE}px`;
  }

  randomize(i) {
    let _i = i || 0;
    if (_i < 10) {
      _i++;
      this.drawLines();
      setTimeout(this.randomize.bind(this, _i), 50);
    }
  }

  drawLines() {
    this._code.clear();
    let lineLength, pos, i, j;
    for (i = 0; i < this._TAB_HEIGHT; i++) {
      this._lines[i] = [];
      lineLength = 0;
      pos = 0;
      for (j = 0; j < this._TAB_WIDTH_LENGTH; j++) {
        if (Math.random() < this._RANDOM_LINE) {
          lineLength++;
        } else {
          this._drawLine(pos, i, lineLength);
          pos += lineLength + 1;
          lineLength = 0;
        }
      }
      this._drawLine(pos, i, (this._TAB_WIDTH_LENGTH - pos));
    }
  }

  _drawLine(x, y, lineWidth) {
    const line = this._code.line(this._MIDDLE_SPACE + ((this._SPACE) * x),
                                 this._MIDDLE_SPACE + ((this._SPACE) * y),
                                 this._MIDDLE_SPACE + ((this._SPACE) * (x + lineWidth)),
                                 this._MIDDLE_SPACE + ((this._SPACE) * y)
    );
    line.attr({
      stroke: '#fff',
      strokeWidth: this._STROKE,
      strokeLinecap: 'round',
    });
    this._lines[y].push(line);
  }
}
