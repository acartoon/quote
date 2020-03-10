import { getRandomString, getRandomInteger, createTable, generateMock, createSource, genaratePropertyes, getRandomStringCount} from "./utils/utils";

const QUOTE_COUNT = 20;

const tagsMock = ["смешно", "интересно", "занудно", "послевоенное", "пиздец", "такойремарк", "горбовский", "лямур"];
const sourceMock = ["Понедельник начинается в субботу", "Трудно быть богом", "Обитаемый остров", "Смерть Ахилесса", "Хищные вещи века", "Три товарища"];
const authorMock = ["Аркадий и Борис Стругацкие", "Эрих Мария Ремарк", "Чарльз Буковски", "Рей Бредбери", "Филипп Дик"];
const colorsMock = ["красный", "синий", "зеленый", "черный", "фиолетовый"];
const genreMock = ["комедия", "драмма", "ужасы", "поэззия", "исторический роман", "послание", "ода", "эпиграмма", "эпитафия"];
const quoteMock = 'Общение с девушками доставляет удовольствие лишь в тех случаях, когда достигается через преодоление препятствий…';

export const tags = generateMock(tagsMock, createTable, `tag`);
export const colors = generateMock(colorsMock, createTable, `color`);
export const authors = generateMock(authorMock, createTable, `author`);
export const genres = generateMock(genreMock, createTable, `genre`);

export const source = createSource(sourceMock, authors);

const createQuotes = () => {
  return {
    id: getRandomString(3),
    quote: getRandomStringCount(quoteMock, getRandomInteger(125, 70), 30),
    id_source: source[getRandomInteger(source.length-1, 0)].id,
    id_color: colors[getRandomInteger(colors.length-1, 0)].id,
    date_create: new Date(),
    special: Boolean(Math.round(Math.random())),
  }
};

export const quotes = new Array(QUOTE_COUNT).fill('').map(() => createQuotes());
export const quoteTags = genaratePropertyes(quotes, tags, `id_quote`, `id_tag`);
export const sourceGenres = genaratePropertyes(source, genres, `id_source`, `id_genre`);

console.log(quoteTags)
