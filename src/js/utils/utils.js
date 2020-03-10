var equal = require('deep-equal');

export const POSTITION = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTER: `after`,
};

export const render = (container, element, place = POSTITION.BEFOREEND) => {
  switch (place) {
    case POSTITION.AFTERBEGIN:
      container.prepend(element);
      break;
    case POSTITION.BEFOREEND:
      container.append(element);
      break;
    case POSTITION.AFTER:
      container.after(element);
      break;
  }
};

export function getRandomString(length) {
  const characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`;
  let result = ``;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export const getRandomInteger = (max, min = 1) => Math.round(min - 0.5 + Math.random() * (max - min + 1));


export const getObjInID = (id, array) => {
  return array.find((item) => item.id === id);
}

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.lastChild;
};

export const getProperty = (quoteId, dataInSearch, DataName, id, id2) => {
  return dataInSearch.reduce((array, item) => {
    if(item[id] == quoteId) {
      array.push(getObjInID(item[id2], DataName));
    }
    return array;
  }, [])
}

export const getTags = (quoteId, quotesTags, tags) => {
  return quotesTags.reduce((arr, tag) => {
    if(tag.id_quote == quoteId) {
      arr.push(getObjInID(tag.id_tag, tags));
    }
    return arr;
  }, [])
}

export const getGenres = (sourceId, sourceGenres, genres) => {
  return sourceGenres.reduce((arr, genre) => {
    if(genre.id_source == sourceId) {
      arr.push(getObjInID(genre.id_genre, genres));
    }
    return arr;
  }, [])
}

/**
 * возвращает объект вида {id: '', name: ''}
 * @param {string} value ключ параметра
 * @param {string} name значение параметра
 */

export const createTable = (value, name) => {
  return {
   id: getRandomString(3),
   [name]: value,
 }
}

/**
 * возвращает массив с моками
 * @param {array} array массив с наименованием моков
 * @param {function} f функция с генерацией объекта моков
 * @param {string} name название ключа
 */
export const generateMock = (array, f, name) => {
  return new Array(array.length).fill('').map((item, i) => f(array[i], name));
}

const createPropertyObj = (idPropertyData, key1, key2, idProrepry) => {
  const result = []
  idPropertyData.forEach((id) => {
    const objProperty = {};
    objProperty.id = getRandomString(3);
    objProperty[key1] = idProrepry;
    objProperty[key2] = id;
    result.push(objProperty);
  });

  return result;
}

/**
 * возвращает массив с уникальным количесвом свойств по элементу не меньше 2-х и не больше 4-х 
 * @param {array} initialData массив с цитатами или книгами, по которому генерируются дополнительные свойства
 * @param {array} propertyData массив с тегами или жанрами книг из которого будет выборка свойств
 * @param {string} initialDataId название ключа цитат или кнги
 * @param {string} propertyDataId название ключа тегов или жанра
 */

export const genaratePropertyes = (initialData, propertyData, initialDataId, propertyDataId) => {
  return initialData.reduce((result, item) => {
    const randomInt = getRandomInteger(4);
    const maxCount = randomInt <= 2 ? 2 : randomInt;
    const idProperty = new Set();
    while(idProperty.size < maxCount) {
      const id = propertyData[getRandomInteger(propertyData.length-1, 0)].id;
      idProperty.add(id);
    }
    const propertyObj = createPropertyObj(idProperty, initialDataId, propertyDataId, item.id)

    result.push(...propertyObj);
    return result;
  }, [])
}

export const generateMock2 = (initialData, propertyData, initialDataId, propertyDataId) => {
  return initialData.reduce((arr, item) => {
    const randomInt = getRandomInteger(4);
    const count = randomInt < 3 ? 2 : randomInt;
    const result = [];
    while(result.length < count ) {
      const obj = {};
      obj.id = getRandomString(3);
      obj[initialDataId] = item.id;
      obj[propertyDataId] = propertyData[getRandomInteger(propertyData.length-1, 0)].id;
      if(result.length > 0) {
        const returnValue = result.some((item) => item[propertyDataId] === obj[propertyDataId]);
        if(!returnValue) {
          result.push(obj);
        }
      } else {
        result.push(obj);
      }
    }
    arr.push(...result);
    return arr;
  }, [])
};
/**
 * возвращает строку с заданой длиной
 * @param {string} string строка с рыбой
 * @param {number} maxCount максимальная длина строки
 * @param {number} minCount минимальная длина строки
 */
export const getRandomStringCount = (string, maxCount, minCount = 0) => {
  return string.slice(minCount, maxCount)
}

/**
 * 
 * @param {array} sourceMock массив с названиями книг
 * @param {*} author массив с авторами 
 */
export const createSource = (sourceMock, author) => {
  const source = generateMock(sourceMock, createTable, `source`);
  source.forEach(item => {
    item.id_author = author[getRandomInteger(author.length-1, 0)].id
  });
  return source;
}
/**
* Возвращает массив названием книги, ее id, автором, его id
* @param {string} source id книги
* @param {array} dataSource массив с авторами
* @param {array} dataAuthors массив с книгами
*/

export const getFullSource = (source, dataSource, dataAuthors) => {
  const result = {}
  const sourceResult = dataSource.find((sourceItem) => source === sourceItem.id);
  Object.assign(result, sourceResult);
  dataAuthors.forEach((author) => {
    if(author.id === result.id_author) {
      result.author = author.author;
    }
  })
  return result;
}