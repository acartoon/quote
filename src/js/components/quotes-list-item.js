
import AbstractComponent from './abstract-component';

export default class QuoteListItem extends AbstractComponent {
  constructor() {
    super();
    this._template = require("../../../src/templates/quote-list-item.pug");
  }
  getTemplate() {
    return this._template;
  }
}
