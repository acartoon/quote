
import AbstractComponent from './abstract-component';
import { render } from '../utils/utils';
import QuoteTags from './quote__tags-list';

export default class PageHeader extends AbstractComponent {
  constructor(container) {
    super();
    this._container = container;
    this._template = require("../../../src/templates/header.pug");
  }

  init() {
    render(this._container, this.getElement())
  }

  getTemplate() {
    return this._template;
  }
}
