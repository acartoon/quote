import Quote from '../components/quote';
import QuoteList from '../components/board';
import { render, getFullSource, getGenres, getTags } from '../utils/utils';
import QuoteListItem from '../components/quotes-list-item';


export default class BoardController {
  constructor(container, onFilter) {
    this._container = container;
    this._quotesData = null;
    this._quoteTagsData = null;
    this._sourceData = null;
    this._sourceGenresData = null;
    this._genresData = null;
    this._tagsData = null;
    this._authorsData = null;
    this._quoteList = new QuoteList;
    this._onFilter = onFilter;
  }

  init(quotesData, quoteTagsData, tagsData, sourceData, sourceGenresData, genresData, authorsData) {
    this._quotesData = quotesData;
    this._quoteTagsData = quoteTagsData;
    this._sourceData = sourceData;
    this._sourceGenresData = sourceGenresData;
    this._genresData = genresData;
    this._tagsData = tagsData;
    this._authorsData = authorsData;
    render(this._container, this._quoteList.getElement());
    this._quoteList.getElement().innerHTML = ``;
    this._quotesData.forEach((quote) => this._renderQuote(quote));
  }

  _renderQuote(quoteData) {
    const quoteListItem = new QuoteListItem;
    const fillsource = getFullSource(quoteData.id_source, this._sourceData, this._authorsData);
    const genres = getGenres(quoteData.id_source, this._sourceGenresData, this._genresData)
    const tags = getTags(quoteData.id, this._quoteTagsData, this._tagsData);
    const quote = new Quote(quoteData, fillsource, genres, tags, this._onFilter);
    render(this._quoteList.getElement(), quoteListItem.getElement());
    render(quoteListItem.getElement(), quote.getElement());
  }
}
