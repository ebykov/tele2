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
        startValue: 0,
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
    this.clickHandler = this.clickHandler.bind(this);

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

    if (e.touches) {
      e = e.touches[0];
    }

    this.settings.currentX = e.clientX;

    // if (this.settings.currentX < this.settings.minX
    //   || this.settings.currentX > this.settings.maxX) {
    //   return;
    // }

    if (this.settings.currentX < this.settings.minX) {
      this.settings.currentX = this.settings.minX;
    } else if (this.settings.currentX > this.settings.maxX) {
      this.settings.currentX = this.settings.maxX;
    }

    if (this.settings.currentX
      < this.settings.minX + (this.settings.betweenSteps * this.props.value) + this.settings.betweenSteps / 2
    && this.settings.currentX
      > this.settings.minX + (this.settings.betweenSteps * this.props.value) - this.settings.betweenSteps / 2) {
      return;
    }

    let direction = null;
    if ((this.settings.prevX - this.settings.currentX) > 0) {
      direction = 'left';
    } else if ((this.settings.prevX - this.settings.currentX) < 0) {
      direction = 'right';
    } else {
      return;
    }

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

  clickHandler(e) {
    e.preventDefault();
    e.stopPropagation();

    if (e.touches) {
      e = e.touches[0];
    }

    const x = e.clientX;
    const rect = this.el.lines.getBoundingClientRect();
    const minX = rect.x;
    const step = this.el.base.offsetWidth / this.props.max;
    let prevPoint = minX;
    let currPoint = prevPoint;

    for (let i = 0; i < this.props.max; i++) {
      currPoint += step;


      if (Math.abs(prevPoint - x) < Math.abs(currPoint - x)) {
        this.setPosition(i);
        return;
      } else if (i === this.props.max - 1) {
        this.setPosition(this.props.max);
        return;
      }

      prevPoint = currPoint;
    }
  }

  reset() {
    this.initEvents();
    this.el.handle.appendChild(this.el.handleTool);
    this.el.lineDiff1.style = '';

    this.el.lineDiff.classList.remove('is-less');
    this.el.lineDiff.classList.remove('is-more');
    this.el.lineDiff.style = '';

    this.el.handleTooltip.classList.remove('is-incorrect');

    this.el.originReal.style.transform = 'translate3d(0,0,0)';
    this.el.handleRealTooltip.textContent = '';

    this.setPosition(this.props.startValue);
  }

  setPosition(value) {
    if (value === this.props.value) {
      return;
    }

    if (value < this.props.min) {
      this.props.value = this.props.min;
    } else if (value > this.props.max) {
      this.props.value = this.props.max;
    } else {
      this.props.value = value;
    }

    let shift = this.settings.step * value;
    if (shift < 0) {
      shift = 0;
    } else if (shift > 100) {
      shift = 100;
    }

    this.el.lineHope.style.width = `${this.props.value * this.settings.step}%`;

    this.el.origin.style.transform = `translate3d(${shift}%,0,0)`;
    this.el.handleTooltip.textContent = this.props.value + this.props.tooltipSuffix;
  }

  download(value, callback) {
    this.destroyEvents();
    this.el.handle.removeChild(this.el.handleTool);

    let type = 'correct';
    let start1 = 0;
    let end1 = value;
    let start2 = 0;
    let end2 = 0;
    const delay = 2000 * (value / this.props.max);

    if (this.props.value < value) {
      type = 'less';
      start2 = this.props.value;
      end2 = value - this.props.value;
      end1 -= end2;
      this.el.lineDiff.classList.add('is-less');
      this.el.lineDiff.style.left = `${start2 * this.settings.step}%`;
    } else if (this.props.value > value) {
      type = 'more';
      start2 = value;
      end2 = this.props.value - start2;
      this.el.lineDiff.classList.add('is-more');
      this.el.lineDiff.style.left = `${start2 * this.settings.step}%`;
    }

    const coeff = end1 / (end1 + end2);
    const dur1 = delay * coeff;
    const dur2 = delay - dur1;

    this.el.lineDiff1.style.transition = `width ${dur1}ms linear`;
    this.el.lineDiff1.style.width = `${end1 * this.settings.step}%`;

    this.el.lineDiff.style.transition = `width ${dur2}ms ${dur1}ms linear`;
    this.el.lineDiff.style.width = `${end2 * this.settings.step}%`;

    if (this.props.value !== value) {
      this.el.handleTooltip.classList.add('is-incorrect');

      this.el.originReal.style.transform = `translate3d(${value * this.settings.step}%,0,0)`;
      this.el.handleRealTooltip.textContent = value;
    }

    setTimeout(() => {
      callback(type, this.props.value);
    }, delay);
  }

  makeElements() {
    this.el = {};

    this.el.slider = makeElement('div', this.props.clsPrefix);
    this.el.base = makeElement('div', `${this.props.clsPrefix}-base`);

    this.el.lines = makeElement('div', `${this.props.clsPrefix}-lines`);

    this.el.lineHope = makeElement('div', [`${this.props.clsPrefix}-line`, `${this.props.clsPrefix}-line--hope`]);
    this.el.lineDiff1 = makeElement('div', [`${this.props.clsPrefix}-line`, `${this.props.clsPrefix}-line--diff1`]);
    this.el.lineDiff = makeElement('div', [`${this.props.clsPrefix}-line`, `${this.props.clsPrefix}-line--diff`]);

    this.el.origin = makeElement('div', `${this.props.clsPrefix}-origin`);

    this.el.handle = makeElement('div', `${this.props.clsPrefix}-handle`);
    this.el.handleTool = makeElement('div', `${this.props.clsPrefix}-handle__tool`);
    this.el.handleTooltip = makeElement('div', `${this.props.clsPrefix}-handle__tooltip`, {
      textContent: this.props.value + this.props.tooltipSuffix,
    });

    this.el.originReal = makeElement('div', `${this.props.clsPrefix}-origin`);

    this.el.handleReal = makeElement('div', `${this.props.clsPrefix}-handle`);
    this.el.handleRealTooltip = makeElement('div', [`${this.props.clsPrefix}-handle__tooltip`, `${this.props.clsPrefix}-handle__tooltip--real`]);

    this.el.scale = makeElement('div', `${this.props.clsPrefix}-scale`);
    this.el.scale.innerHTML += `<span data-value="${this.props.min}" style="left: 0"></span>`;
    let offsetX = 0;
    [...Array(this.props.max - 1)].forEach((item) => {
      offsetX += this.settings.step;
      this.el.scale.innerHTML += `<span style="left: ${offsetX}%"></span>`;
    });
    this.el.scale.innerHTML += `<span data-value="${this.props.max}" style="left: 100%"></span>`;

    this.el.lines.appendChild(this.el.lineHope);
    this.el.lines.appendChild(this.el.lineDiff1);
    this.el.lines.appendChild(this.el.lineDiff);

    this.el.handle.appendChild(this.el.handleTool);
    this.el.handle.appendChild(this.el.handleTooltip);

    this.el.origin.appendChild(this.el.handle);

    this.el.handleReal.appendChild(this.el.handleRealTooltip);

    this.el.originReal.appendChild(this.el.handleReal);

    this.el.base.appendChild(this.el.lines);
    this.el.base.appendChild(this.el.origin);
    this.el.base.appendChild(this.el.originReal);

    this.el.slider.appendChild(this.el.base);
    this.el.slider.appendChild(this.el.scale);

    this.props.container.appendChild(this.el.slider);
  }

  initEvents() {
    this.el.handleTool.addEventListener('mousedown', this.start);
    this.el.handleTool.addEventListener('touchstart', this.start);

    this.el.lines.addEventListener('click', this.clickHandler);
  }

  destroyEvents() {
    this.el.handleTool.removeEventListener('mousedown', this.start);
    this.el.handleTool.removeEventListener('touchstart', this.start);

    this.el.lines.removeEventListener('click', this.clickHandler);
  }

  init() {
    if (this.props.container instanceof HTMLElement) {
      this.makeElements();
      this.initEvents();
      this.setPosition(this.props.startValue);
    }
  }
}
