
import AbstractComponent from '../components/abstract-component';
import { render } from '../utils/utils';
import QuoteTags from '../components/quote__tags-list';

export default class Quote extends AbstractComponent {
  constructor(quote, source, genres, tags, onFilter) {
    super();
    this._quote = quote;
    this._source = source;
    this._genres = genres;
    this._tags = tags;
    this._QuoteListItem;
    this._onFilter = onFilter;
    this._template = require("!!pug-loader! ../../../src/templates/quote.pug");
    this._tagsList = new QuoteTags(this._tags, this._onFilter);
    this._renderTags();
  }

  _renderTags() {
    const container = this.getElement().querySelector(`.quote__footer`);
    render(container, this._tagsList.getElement());
  }

  getTemplate() {
    const locals = {quote: this._quote, source: this._source, genres: this._genres};
    return this._template(locals);
  }
}
