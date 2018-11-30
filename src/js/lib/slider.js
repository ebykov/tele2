import { makeElement, removeChildren } from './dom';

export default class Slider {
  constructor(props = {}) {
    this.props = {
      ...{
        container: document.body,
        clsPrefix: 't2slider',
        tooltipSuffix: ' Гб',
        min: 0,
        max: 10,
        value: 0,
        startValue: 4,
      },
      ...props,
    };

    this.settings = {
      step: 100 / this.props.max,
      shift: 0,
    };

    this.start = this.start.bind(this);
    this.move = this.move.bind(this);
    this.stop = this.stop.bind(this);

    this.init();
  }

  start(e) {
    e.preventDefault();
    e.stopPropagation();

    if (e.touches) {
      e = e.touches[0];
    }

    const baseRect = this.el.base.getBoundingClientRect();

    this.settings.prevX = e.clientX;
    this.settings.minX = baseRect.x;
    this.settings.maxX = baseRect.x + this.el.base.offsetWidth;
    this.settings.betweenSteps = this.el.base.offsetWidth / this.settings.step;

    document.addEventListener('mousemove', this.move);
    document.addEventListener('touchmove', this.move);
    document.addEventListener('mouseup', this.stop);
    document.addEventListener('mouseleave', this.stop);
    document.addEventListener('touchend', this.stop);
    document.addEventListener('touchleave', this.stop);
    document.addEventListener('touchcancel', this.stop);
  }

  move(e) {
    e.preventDefault();
    e.stopPropagation();

    this.settings.currentX = e.clientX;

    if (this.settings.currentX < this.settings.minX
      || this.settings.currentX > this.settings.maxX) {
      return;
    }

    if (this.settings.currentX
      < this.settings.minX + (this.settings.betweenSteps * this.props.value) + this.settings.betweenSteps / 2
    && this.settings.currentX
      > this.settings.minX + (this.settings.betweenSteps * this.props.value) - this.settings.betweenSteps / 2) {
      return;
    }

    const direction = (this.settings.prevX - this.settings.currentX) > 0 ? 'left' : 'right';
    const value = direction === 'left' ? this.props.value - 1 : this.props.value + 1;

    this.settings.prevX = this.settings.currentX;

    this.setPosition(value);
  }

  stop(e) {
    document.removeEventListener('mousemove', this.move);
    document.removeEventListener('touchmove', this.move);
    document.removeEventListener('mouseup', this.stop);
    document.removeEventListener('mouseleave', this.stop);
    document.removeEventListener('touchend', this.stop);
    document.removeEventListener('touchleave', this.stop);
    document.removeEventListener('touchcancel', this.stop);
  }

  reset() {
    this.el.handle.appendChild(this.el.handleTool);
    this.el.lineHope.classList.remove('is-chosen');
    this.el.lineReal.classList.remove('is-less');
    this.el.lineReal.classList.remove('is-more');
    this.el.lineReal.style = '';

    this.setPosition(this.props.startValue);
  }

  setPosition(value) {
    if (value < this.props.min) {
      this.props.value = this.props.min;
    } else if (value > this.props.max) {
      this.props.value = this.props.max;
    } else {
      this.props.value = value;
    }

    const shift = this.settings.step * value;

    this.el.lineHope.style.width = `${this.props.value * this.settings.step}%`;

    this.el.origin.style.transform = `translate3d(${shift}%,0,0)`;
    this.el.handleTooltip.textContent = this.props.value + this.props.tooltipSuffix;
  }

  download(value, callback) {
    this.el.handle.removeChild(this.el.handleTool);
    this.el.lineHope.classList.add('is-chosen');

    let type = 'correct';
    let start = 0;
    let end = value;

    if (this.props.value < value) {
      type = 'less';
      start = this.props.value;
      end = value - this.props.value;
      this.el.lineReal.classList.add('is-less');
      this.el.lineReal.style.left = `${start * this.settings.step}%`;
      this.el.lineReal.style.width = `${end * this.settings.step}%`;
    } else if (this.props.value > value) {
      type = 'more';
      start = value;
      end = this.props.value - start;
      this.el.lineReal.classList.add('is-more');
      this.el.lineReal.style.left = `${start * this.settings.step}%`;
      this.el.lineReal.style.width = `${end * this.settings.step}%`;
    }

    setTimeout(() => {
      callback(type, this.props.value);
    }, 2000 * (value / this.props.max));
  }

  makeElements() {
    this.el = {};

    this.el.slider = makeElement('div', this.props.clsPrefix);
    this.el.base = makeElement('div', `${this.props.clsPrefix}-base`);

    this.el.lines = makeElement('div', `${this.props.clsPrefix}-lines`);

    this.el.lineHope = makeElement('div', [`${this.props.clsPrefix}-line`, `${this.props.clsPrefix}-line--hope`]);
    this.el.lineReal = makeElement('div', [`${this.props.clsPrefix}-line`, `${this.props.clsPrefix}-line--real`]);

    this.el.origin = makeElement('div', `${this.props.clsPrefix}-origin`);

    this.el.handle = makeElement('div', `${this.props.clsPrefix}-handle`);
    this.el.handleTool = makeElement('div', `${this.props.clsPrefix}-handle__tool`);
    this.el.handleTooltip = makeElement('div', `${this.props.clsPrefix}-handle__tooltip`, {
      textContent: this.props.value + this.props.tooltipSuffix,
    });

    this.el.scale = makeElement('div', `${this.props.clsPrefix}-scale`);
    this.el.scale.innerHTML += `<span data-value="${this.props.min}" style="left: 0"></span>`;
    let offsetX = 0;
    [...Array(this.props.max - 1)].forEach((item) => {
      offsetX += this.settings.step;
      this.el.scale.innerHTML += `<span style="left: ${offsetX}%"></span>`;
    });
    this.el.scale.innerHTML += `<span data-value="${this.props.max}" style="left: 100%"></span>`;

    this.el.lines.appendChild(this.el.lineHope);
    this.el.lines.appendChild(this.el.lineReal);

    this.el.handle.appendChild(this.el.handleTool);
    this.el.handle.appendChild(this.el.handleTooltip);

    this.el.origin.appendChild(this.el.handle);

    this.el.base.appendChild(this.el.lines);
    this.el.base.appendChild(this.el.origin);

    this.el.slider.appendChild(this.el.base);
    this.el.slider.appendChild(this.el.scale);

    this.props.container.appendChild(this.el.slider);
  }

  initEvents() {
    this.el.handleTool.addEventListener('mousedown', this.start);
    this.el.handleTool.addEventListener('touchstart', this.start);
  }

  init() {
    if (this.props.container instanceof HTMLElement) {
      this.makeElements();
      this.initEvents();
      this.setPosition(this.props.startValue);
    }
  }
}
