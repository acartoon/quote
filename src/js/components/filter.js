
import AbstractComponent from './abstract-component';
import { render } from '../utils/utils';

export default class Filter extends AbstractComponent {
  constructor(container, ) {
    super();
    this._container =  container;
    this._template = require("!!pug-loader! ../../../src/templates/filter.pug");
    this._filter = ['все', 'новые', 'в закладках', 'красные', 'зеленые']
  }

  init() {
    render(this._container, this.getElement());
  }

  getTemplate() {
    return this._template({filter: this._filter});
  }
}

// в фильтре есть ВСЕ, самые новые, три последних дня загрузки, или последние 10, в закладках, 2 самых популярных тега