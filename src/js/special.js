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

function pluralize(count, words) {
  const cases = [2, 0, 1, 1, 1, 2];
  return count + "&nbsp;" + words[(count % 100 > 4 && count % 100 < 20) ? 2 : cases[Math.min(count % 10, 5)]];
}

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
    EL.aTitle = makeElement('div', `${CSS.main}-test__answer-title`);
    EL.aText = makeElement('div', `${CSS.main}-test__answer-text`);

    EL.q.appendChild(EL.qText);
    EL.q.appendChild(EL.qTitle);
    EL.q.appendChild(EL.qNotice);

    EL.a.appendChild(EL.aTitle);
    EL.a.appendChild(EL.aText);

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

    EL.rTitle = makeElement('div', `${CSS.main}-result__title`);
    EL.rCaption = makeElement('div', `${CSS.main}-result__caption`);
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
      textContent: 'Как это работает',
    });

    EL.rBtnWrap.appendChild(EL.rBtn);

    EL.rHead.appendChild(EL.rTitle);
    EL.rHead.appendChild(EL.rCaption);
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
    EL.tBtn.classList.remove('is-filled');
    EL.tBtn.textContent = 'Скачать';
    EL.tBtn.dataset.click = 'download';
    this.makeNextQuestion();
  }

  continue() {
    this.activeIndex += 1;
    this.slider.reset();
    EL.tBtn.classList.remove('is-filled');
    EL.tBtn.textContent = 'Скачать';
    EL.tBtn.dataset.click = 'download';
    this.makeNextQuestion();
  }

  result() {
    this.main.classList.add('is-result');
    this.main.removeChild(EL.test);
    this.main.appendChild(EL.result);

    EL.rTitle.innerHTML = `Я всё скачал в ${this.correctAnswers} из ${Data.questions.length} ситуаций`;
    if (this.traffic > this.filesSize) {
      EL.rCaption.innerHTML = `И потратил ${pluralize(this.traffic - this.filesSize, ['лишних гигабайт', 'лишних гигабайта', 'лишних гигабайт'])}`;
    } else {
      EL.rCaption.innerHTML = `И потратил ${pluralize(this.traffic, ['гигабайт', 'гигабайта', 'гигабайт'])}`;
    }

    EL.rOutOf.innerHTML = '';
    if (this.correctAnswers > 0) {
      EL.rOutOf.innerHTML += '<span class="is-filled"></span>'.repeat(this.correctAnswers);
    }

    EL.rOutOf.innerHTML += '<span></span>'.repeat(Data.questions.length - this.correctAnswers);

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

    EL.tImg.classList.remove('is-enable');
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
      EL.tImg.classList.add('is-enable');
    }, 100);

    EL.aTitle.innerHTML = q.answer[type].title;
    EL.aText.innerHTML = q.answer[type].text;

    removeChildren(EL.tBody);
    EL.tBody.appendChild(EL.a);

    this.traffic += chosenSize;
    this.filesSize += q.size;
    if (type === 'correct' || type === 'more') {
      this.correctAnswers += 1;
    }

    EL.tBtn.classList.remove('is-disabled');
    EL.tBtn.classList.add('is-filled');
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
    this.filesSize = 0;
  }

  init() {
    this.setInitialParams();
    if (this.params.isFeed) {
      this.container.classList.add('is-feed');
    }
    this.container.style.opacity = '1';
    this.main = this.container.querySelector('#tele2-special-main');
    this.enter = this.main.querySelector('#tele2-special-enter');
    this.enterImg = this.main.querySelector('#tele2-special-enter-img');

    this.enterImg.classList.add('is-enable');

    Special.createElements();
  }
}

export default Special;
