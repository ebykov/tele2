import '../css/special.styl';

import BaseSpecial from './base';
import { makeElement, removeChildren } from './lib/dom';
import Slider from './lib/slider';
import * as Share from './lib/share';
import * as Analytics from './lib/analytics';
import Svg from './svg';
import Data from './data';

const CSS = {
  main: 'tele2',
};

const EL = {};

class Special extends BaseSpecial {
  constructor(params = {}) {
    super();

    Object.assign(this.params, params);
    this.saveParams();

    if (Data && params.data) {
      Object.assign(Data, params.data);
    }

    this.answer = this.answer.bind(this);

    if (this.params.css) {
      this.loadStyles(this.params.css).then(() => this.init());
    } else {
      this.init();
    }
  }

  static createElements() {
    EL.test = makeElement('div', `${CSS.main}-test`);
    EL.tPages = makeElement('div', `${CSS.main}-test__pages`);
    EL.tInner = makeElement('div', `${CSS.main}-test__inner`);
    EL.tHead = makeElement('div', `${CSS.main}-test__head`);
    EL.tImg = makeElement('div', `${CSS.main}-test__img`);
    EL.tSpinner = makeElement('div', `${CSS.main}-test__spinner`, {
      innerHTML: Svg.spinner,
    });

    EL.tBody = makeElement('div', `${CSS.main}-test__body`);
    EL.q = makeElement('div', `${CSS.main}-test__q`);
    EL.qText = makeElement('div', `${CSS.main}-test__q-text`);
    EL.qTitle = makeElement('div', `${CSS.main}-test__q-title`);
    EL.qNotice = makeElement('div', `${CSS.main}-test__q-notice`);
    EL.a = makeElement('div', `${CSS.main}-test__answer`);

    EL.q.appendChild(EL.qText);
    EL.q.appendChild(EL.qTitle);
    EL.q.appendChild(EL.qNotice);

    EL.tBottom = makeElement('div', `${CSS.main}-test__bottom`);
    EL.tSliderWrap = makeElement('div', `${CSS.main}-test__slider`);
    EL.tBtnWrap = makeElement('div', `${CSS.main}-test__btn`);
    EL.tBtn = makeElement('button', `${CSS.main}-btn`, {
      textContent: 'Скачать',
      data: {
        click: 'download',
      },
    });

    EL.tBtnWrap.appendChild(EL.tBtn);

    EL.tBottom.appendChild(EL.tSliderWrap);
    EL.tBottom.appendChild(EL.tBtnWrap);

    EL.tInner.appendChild(EL.tHead);
    EL.tInner.appendChild(EL.tBody);
    EL.tInner.appendChild(EL.tBottom);

    EL.test.appendChild(EL.tPages);
    EL.test.appendChild(EL.tInner);

    EL.result = makeElement('div', `${CSS.main}-result`);
    EL.rHead = makeElement('div', `${CSS.main}-result__head`);
    EL.rBottom = makeElement('div', `${CSS.main}-result__bottom`);

    EL.rResult = makeElement('div', `${CSS.main}-result__result`);
    EL.rTitle = makeElement('div', `${CSS.main}-result__title`);
    EL.rOutOf = makeElement('div', `${CSS.main}-result__out-of`);
    EL.rShare = makeElement('div', `${CSS.main}-result__share`);
    EL.rRestart = makeElement('div', `${CSS.main}-result__restart`, {
      innerHTML: `<span>Пройти еще раз</span>${Svg.refresh}`,
      data: {
        click: 'restart',
      },
    });
    EL.rText = makeElement('div', `${CSS.main}-result__text`, {
      textContent: Data.result.text,
    });
    EL.rBtnWrap = makeElement('div', `${CSS.main}-result__btn`);
    EL.rBtn = makeElement('a', `${CSS.main}-btn`, {
      href: Data.result.link,
      target: '_blank',
      textContent: 'Кнопка',
    });

    EL.rBtnWrap.appendChild(EL.rBtn);

    EL.rHead.appendChild(EL.rResult);
    EL.rHead.appendChild(EL.rTitle);
    EL.rHead.appendChild(EL.rOutOf);
    EL.rHead.appendChild(EL.rShare);
    EL.rHead.appendChild(EL.rRestart);

    EL.rBottom.appendChild(EL.rText);
    EL.rBottom.appendChild(EL.rBtnWrap);

    EL.result.appendChild(EL.rHead);
    EL.result.appendChild(EL.rBottom);
  }

  start() {
    Analytics.sendEvent('Start');

    this.main.removeChild(this.enter);
    this.main.appendChild(EL.test);

    this.slider = new Slider({
      container: EL.tSliderWrap,
    });

    this.makeNextQuestion();
  }

  restart() {
    this.setInitialParams();

    this.main.classList.remove('is-result');
    this.main.removeChild(EL.result);
    this.main.appendChild(EL.test);

    this.slider.reset();
    EL.tBtn.textContent = 'Скачать';
    EL.tBtn.dataset.click = 'download';
    this.makeNextQuestion();
  }

  continue() {
    this.activeIndex += 1;
    this.slider.reset();
    EL.tBtn.textContent = 'Скачать';
    EL.tBtn.dataset.click = 'download';
    this.makeNextQuestion();
  }

  result() {
    this.main.classList.add('is-result');
    this.main.removeChild(EL.test);
    this.main.appendChild(EL.result);

    EL.rResult.textContent = `Я скачал ${this.correctAnswers}/${Data.questions.length} файлов`;
    EL.rTitle.textContent = `И потратил ${this.traffic} гигабайт`;
    EL.rOutOf.innerHTML = [...Array(this.traffic)].reduce((prev, curr) => {
      prev += '<span></span>';
      return prev;
    }, '<span></span>');

    removeChildren(EL.rShare);
    Share.make(EL.rShare, {
      url: this.params.share.url + this.correctAnswers,
      title: this.params.share.title,
      twitter: this.params.share.title,
    });
  }

  makeNextQuestion() {
    this.downloading = false;

    const q = Data.questions[this.activeIndex];

    EL.tPages.textContent = `${this.activeIndex + 1}/${Data.questions.length}`;

    removeChildren(EL.tHead);
    EL.tHead.appendChild(EL.tImg);

    EL.tImg.classList.add('is-preview');
    EL.tImg.innerHTML = q.img;
    EL.qText.textContent = q.text;
    EL.qTitle.textContent = q.title;
    EL.qNotice.textContent = q.notice;

    removeChildren(EL.tBody);
    EL.tBody.appendChild(EL.q);
  }

  download() {
    if (this.downloading) {
      return;
    }
    this.downloading = true;

    const q = Data.questions[this.activeIndex];

    EL.tHead.removeChild(EL.tImg);
    EL.tHead.appendChild(EL.tSpinner);

    EL.tBtn.classList.add('is-disabled');

    this.slider.download(q.size, this.answer);
  }

  answer(type, chosenSize) {
    const q = Data.questions[this.activeIndex];

    EL.tHead.removeChild(EL.tSpinner);
    EL.tHead.appendChild(EL.tImg);

    setTimeout(() => {
      EL.tImg.classList.remove('is-preview');
    }, 100);

    EL.a.innerHTML = q.answer[type];

    removeChildren(EL.tBody);
    EL.tBody.appendChild(EL.a);

    this.traffic += chosenSize;
    if (type === 'correct' || type === 'more') {
      this.correctAnswers += 1;
    }

    EL.tBtn.classList.remove('is-disabled');
    if (this.activeIndex < Data.questions.length - 1) {
      EL.tBtn.textContent = 'Далее';
      EL.tBtn.dataset.click = 'continue';
    } else {
      EL.tBtn.textContent = 'Результат';
      EL.tBtn.dataset.click = 'result';
    }
  }

  setInitialParams() {
    this.activeIndex = 0;
    this.correctAnswers = 0;
    this.traffic = 0;
  }

  init() {
    this.setInitialParams();
    this.container.style.opacity = '1';
    this.main = this.container.querySelector('#tele2-special-main');
    this.enter = this.main.querySelector('#tele2-special-enter');

    Special.createElements();
  }
}

export default Special;
