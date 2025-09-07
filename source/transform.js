'use strict';

/**
 * Функция, преобразующуая значения объекта
 * @param {Object} obj - Объект, значения которого могут быть числами или вложенными объектами
 * @param {function(number) : number} transformFn - функция преобразования числа
 * @example
 * // returns { a: 2, b: { c: 3, d: 4 }, e: 5 }
 * transform({ a: 1, b: { c: 2, d: 3 }, e: 4 }, (value) => value + 1);
 *
 * @returns {Object} - преобразованный объект
 */
let transform = function(obj, transformFn) {
    for (let key in obj) {
        if(typeof obj[key] === 'object') {
            transform(obj[key], transformFn);
            continue;
        }
        obj[key] = transformFn(obj[key]);
    }
    return obj;
}





