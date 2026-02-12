// @ts-check
/**
 * @typedef {import("../types.js").Callback} Callback
 * @typedef {import("../types.js").Node} Node
 */

const id = require('../util/id.js');

let counts = 0;

function increment() {
  counts++;
}

/**
 * @param {string} configuration
 * @param {Callback} callback
 */
function get(configuration, callback) {
  const config = globalThis.distribution.node.config;

  if (configuration === 'nid') {
    return callback(null, id.getNID(config));
  } else if (configuration === 'sid') {
    return callback(null, id.getSID(config));
  } else if (configuration === 'ip') {
    return callback(null, config.ip);
  } else if (configuration === 'port') {
    return callback(null, config.port);
  } else if (configuration === 'counts') {
    return callback(null, counts);
  } else if (configuration === 'heapTotal') {
    return callback(null, process.memoryUsage().heapTotal);
  } else if (configuration === 'heapUsed') {
    return callback(null, process.memoryUsage().heapUsed);
  } else {
    return callback(new Error(`Status key "${configuration}" not found`));
  }
};


/**
 * @param {Node} configuration
 * @param {Callback} callback
 */
function spawn(configuration, callback) {
  callback(new Error('status.spawn not implemented'));
}

/**
 * @param {Callback} callback
 */
function stop(callback) {
  callback(new Error('status.stop not implemented'));
}

module.exports = {get, spawn, stop, increment};
