
import AbstractComponent from './abstract-component';

export default class QuoteTags extends AbstractComponent {
  constructor(tags, onFilter) {
    super();
    this._tags = tags;
    this._onFilter = onFilter;
    this._template = require("!!pug-loader! ../../../src/templates/quote__tags-list.pug");
    this.onClick();
  }

  onClick() {
    this.getElement().addEventListener(`click`, (e) => {
      e.preventDefault();
      if(e.target.dataset.tagValue) {
        this._onFilter(e.target.dataset.tagValue);
      }
    })
  }

  getTemplate() {
    const locals = {tags: this._tags};
    return this._template(locals);
  }
}
