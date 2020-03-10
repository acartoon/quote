
import AbstractComponent from './abstract-component';

export default class QuoteList extends AbstractComponent {
  constructor() {
    super();
    this._template = require("!!pug-loader! ../../../src/templates/quote-list.pug");
  }
  getTemplate() {
    return this._template;
  }
}
