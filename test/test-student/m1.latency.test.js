const distribution = require('../../distribution.js')();
const util = distribution.util;

function measure(label, obj) {
  const start = process.hrtime.bigint();
  for (let i = 0; i < 1000; i++) {
    util.deserialize(util.serialize(obj));
  }
  const avg = Number(process.hrtime.bigint() - start) / 1000 / 1000;
  console.log(`${label}: ${avg.toFixed(2)} µs`);
}

test('latency', () => {
  measure('Number', 42);
  measure('String', 'hello world');
  measure('Function', (a, b) => a + b);
  measure('Object', {a: 1, b: 'two', c: [3, 4], d: {nested: true}});
  measure('Date', new Date());
  measure('Error', new Error('test'));
});
