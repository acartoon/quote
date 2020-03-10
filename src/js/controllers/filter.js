import BoardController from "./board";
import { render } from "../utils/utils";
import PageHeader from "../components/page-header";
import Filter from "../components/filter";

export default class MainPageController {
  constructor(container, quotesData, quoteTagsData, tagsData, sourceData, sourceGenresData, genresData, authorsData) {
    this._container = container;
    this._quotesData = quotesData;
    this._quoteTagsData = quoteTagsData;
    this._sourceData = sourceData;
    this._sourceGenresData = sourceGenresData;
    this._genresData = genresData;
    this._tagsData = tagsData;
    this._authorsData = authorsData;
    this._boardController = null;
    this._header = new PageHeader(this._container.querySelector(`.page__header`));
    this._mainContainer = this._container.querySelector(`.main-page > .container`);
    this._filter = new Filter(this._mainContainer.querySelector(`.main-page__filter-list`));
  }
  
  init() {
    this._header.init();
    this._filter.init();
    this._boardController = new BoardController(this._mainContainer, this.onFilter.bind(this));
    this._boardController.init(this._quotesData, this._quoteTagsData, this._tagsData, this._sourceData, this._sourceGenresData, this._genresData, this._authorsData);
  }

  onFilter(value) {
    const resultId = this._quoteTagsData.reduce((array, quote) => {
      if(quote.id_tag ===  value) {
        array.push(quote.id_quote)
      }
      return array;
    }, []);

  const resultData = this._quotesData.filter((quote) => {
    return resultId.includes(quote.id);
  });

  this._boardController.init(resultData, this._quoteTagsData, this._tagsData, this._sourceData, this._sourceGenresData, this._genresData, this._authorsData);
  }
}
