/* eslint-disable require-jsdoc */

'use strict';

QUnit.module('Тестируем функцию transform', () => {
    QUnit.test('Работает правильно с простыми объектами', (assert) => {
        const originalObject = { a: 1, b: 2, c: 3 };
        const transformFunction = (value) => value * 2;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { a: 2, b: 4, c: 6 }, 'Значения должны быть умножены на 2');
    });

    QUnit.test('Работает правильно с вложенными объектами', (assert) => {
        const originalObject = { a: 1, b: { c: 2, d: 3 }, e: 4 };
        const transformFunction = (value) => value + 1;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { a: 2, b: { c: 3, d: 4 }, e: 5 }, 'Значения должны быть увеличены на 1');
    });

    QUnit.test('Работает правильно с массивами', (assert) => {
        const originalObject = { a: [1, 2, 3], b: 4 };
        const transformFunction = (value) => value * 3;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { a: [3, 6, 9], b: 12 }, 'Элементы массива должны быть умножены на 3');
    });

    QUnit.test('Работает с глубоко вложенными объектами', (assert) => {
        const originalObject = { a : 1, b: {c : 12, d: { e: 3, f: { g: 4 } } } };
        const transformFunction = (value) => value + 5;
        const result = transform(originalObject, transformFunction);
        assert.deepEqual(result, { a: 6, b : {c : 17, d : { e: 8, f: { g: 9 } } } }, 'Значения должны быть увеличены на 5');

    })
    QUnit.test('Работает с пустым объектом', (assert) => {
        const originalObject = {};
        const transformFunction = (value) => value * 4;
        const result = transform(originalObject, transformFunction);
        assert.deepEqual(result, {}, 'Пустой объект должен остаться пустым');
    })
    QUnit.test('Обрабатывает null/undefind', (assert) => {
        const originalObject = undefined;
        const transformFunction = (value) => value * 4;
        assert.throws(() => transform(originalObject, transformFunction), TypeError, 'Пустой объект должен остаться пустым');
    })
    QUnit.test('Обрабатывает примитивы', (assert) => {
        const originalObject = 125;
        const transformFunction = (value) => value * 4;
        assert.throws(() => transform(originalObject, transformFunction), TypeError, 'Пустой объект должен остаться пустым');
    })
    QUnit.test('Сохраняет иммутабельность объектов', (assert) => {
        const originalObject = { a: [1, 2, 3], b: 4 };
        const transformFunction = (value) => value * 3;
        const result = transform(originalObject, transformFunction);
        assert.deepEqual(originalObject, { a: [1, 2, 3], b: 4 }, 'Оригинал не должен измениться');
        assert.deepEqual(result, { a: [3, 6, 9], b: 12 }, 'Результат должен быть правильно преобразован');
    })
    QUnit.test('Работает с null в качестве значения', (assert) => {
        const originalObject = {a: [null, 2, 3], b: 4};
        const transformFunction = (value) => value * 4;
        const result = transform(originalObject, transformFunction);
        assert.deepEqual(result, {a: [null, 8, 12], b: 16}, 'Значения должны быть увеличены в 4 раза, null пропускается');
    })
    QUnit.test('Работает с undefined в качестве значения', (assert) => {
        const originalObject = {a: [undefined, 2, 3], b: 4};
        const transformFunction = (value) => value * 4;
        const result = transform(originalObject, transformFunction);
        assert.deepEqual(result, {a: [undefined, 8, 12], b: 16}, 'Значения должны быть увеличены в 4 раза, undefined пропускается');
    })
});

