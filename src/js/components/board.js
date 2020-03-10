
import AbstractComponent from './abstract-component';

export default class Board extends AbstractComponent {
  constructor() {
    super();
  }
  getTemplate() {
    return `<ul class="quotes-list row"></ul>`;
  }
}
