/*
    In this file, add your own test cases that correspond to functionality introduced for each milestone.
    You should fill out each test case so it adequately tests the functionality you implemented.
    You are left to decide what the complexity of each test case should be, but trivial test cases that abuse this flexibility might be subject to deductions.

    Imporant: Do not modify any of the test headers (i.e., the test('header', ...) part). Doing so will result in grading penalties.
*/

const distribution = require('../../distribution.js')();
require('../helpers/sync-guard');

test('(1 pts) student test', () => {
  // number, string, boolean, null, undefined
  const util = distribution.util;

  expect(util.deserialize(util.serialize(42))).toBe(42);
  expect(util.deserialize(util.serialize('hello'))).toBe('hello');
  expect(util.deserialize(util.serialize(true))).toBe(true);
  expect(util.deserialize(util.serialize(false))).toBe(false);
  expect(util.deserialize(util.serialize(null))).toBe(null);
  expect(util.deserialize(util.serialize(undefined))).toBe(undefined);
});


test('(1 pts) student test', () => {
  // nan, inf, neg
  const util = distribution.util;

  expect(util.deserialize(util.serialize(NaN))).toBeNaN();
  expect(util.deserialize(util.serialize(Infinity))).toBe(Infinity);
  expect(util.deserialize(util.serialize(-3.14))).toBe(-3.14);
  expect(util.deserialize(util.serialize(0))).toBe(0);
});


test('(1 pts) student test', () => {
  // objects and arrays
  const util = distribution.util;

  const obj = {a: 1, b: 'two', c: false, d: null};
  const desObj = util.deserialize(util.serialize(obj));
  expect(desObj).toEqual(obj);

  const arr = [1, 'two', true, null];
  const desArr = util.deserialize(util.serialize(arr));
  expect(desArr).toEqual(arr);

  const nested = {x: {y: {z: [1, 2, 3]}}};
  expect(util.deserialize(util.serialize(nested))).toEqual(nested);
});

test('(1 pts) student test', () => {
  // Date, Error, and functions
  const util = distribution.util;

  const date = new Date('2025-01-01T00:00:00.000Z');
  const desDate = util.deserialize(util.serialize(date));
  expect(desDate).toEqual(date);

  const err = new Error('test error');
  const desErr = util.deserialize(util.serialize(err));
  expect(desErr.message).toBe('test error');
  expect(desErr.name).toBe('Error');

  const fn = (x) => x * 2;
  const desFn = util.deserialize(util.serialize(fn));
  expect(desFn(5)).toBe(10);
});

test('(1 pts) student test', () => {
  // mixed type
  const util = distribution.util;

  const complex = {
    num: 99,
    str: 'test',
    bool: true,
    nl: null,
    undef: undefined,
    arr: [1, 'a', false],
    nested: {inner: {deep: 42}},
  };

  const result = util.deserialize(util.serialize(complex));
  expect(result.num).toBe(99);
  expect(result.str).toBe('test');
  expect(result.bool).toBe(true);
  expect(result.nl).toBe(null);
  expect(result.undef).toBe(undefined);
  expect(result.arr).toEqual([1, 'a', false]);
  expect(result.nested).toEqual({inner: {deep: 42}});
});
