const searchBtn = document.querySelector(`.search__btn`);
const searchInput = document.querySelector(`.search__input`);
const mainNavInner = document.querySelector(`.main-nav__inner`);

searchBtn.addEventListener(`click`, () => {
  mainNavInner.classList.toggle(`search-open`);
  if(mainNavInner.classList.contains(`search-open`))
    searchInput.focus();
});

if(document.querySelector(`.quote `)) {
  const quote = document.querySelector(`.quote `);
  const dataToSend = ['one', 'two', 'tree', 'for'];

  quote.addEventListener(`click`, () => {
    localStorage.setItem("quote", JSON.stringify(dataToSend));
    window.open("quote.html");
  });
}

if(document.querySelector('.clickMe')) {
  const click = document.querySelector('.clickMe');

  click.addEventListener(`click`, () => {
    var data = JSON.parse(localStorage.getItem("quote"));
    console.log(data);
  });
}