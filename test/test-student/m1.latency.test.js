const distribution = require('../../distribution.js')();
const util = distribution.util;

function measure(label, fn) {
  const start = process.hrtime.bigint();
  for (let i = 0; i < 1000; i++) {
    fn();
  }
  const avg = Number(process.hrtime.bigint() - start) / 1000 / 1000;
  console.log(`${label}: ${avg.toFixed(2)} µs`);
}

test('latency: primitives', () => {
  measure('Number', () => {
    expect(util.deserialize(util.serialize(42))).toBe(42);
  });
  measure('String', () => {
    expect(util.deserialize(util.serialize('hello'))).toBe('hello');
  });
  measure('Boolean', () => {
    expect(util.deserialize(util.serialize(true))).toBe(true);
  });
  measure('Null', () => {
    expect(util.deserialize(util.serialize(null))).toBe(null);
  });
  measure('Undefined', () => {
    expect(util.deserialize(util.serialize(undefined))).toBe(undefined);
  });
});

test('latency: functions', () => {
  const fn = (x) => x * 2;
  measure('Function', () => {
    const desFn = util.deserialize(util.serialize(fn));
    expect(desFn(5)).toBe(10);
  });
});

test('latency: complex structures', () => {
  const obj = {a: 1, b: 'two', c: false, d: null};
  measure('Object', () => {
    expect(util.deserialize(util.serialize(obj))).toEqual(obj);
  });

  const arr = [1, 'two', true, null];
  measure('Array', () => {
    expect(util.deserialize(util.serialize(arr))).toEqual(arr);
  });

  const nested = {x: {y: {z: [1, 2, 3]}}};
  measure('Nested', () => {
    expect(util.deserialize(util.serialize(nested))).toEqual(nested);
  });

  measure('Date', () => {
    const d = new Date('2025-01-01T00:00:00.000Z');
    expect(util.deserialize(util.serialize(d))).toEqual(d);
  });

  measure('Error', () => {
    const err = new Error('test');
    const desErr = util.deserialize(util.serialize(err));
    expect(desErr.message).toBe('test');
  });
});
