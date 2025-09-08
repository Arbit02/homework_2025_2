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
const transform = function(obj, transformFn) {
    if (typeof obj !== 'object') {
        throw new TypeError('obj must be an object');
    }
        const result = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key]) {
            result[key] = transform(obj[key], transformFn);
            continue;
        }
        result[key] = obj[key] ? transformFn(obj[key]) : obj[key] ;
    }
    return result;
}
