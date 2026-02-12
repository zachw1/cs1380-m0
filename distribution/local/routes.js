/**
 * @typedef {import("../types").Callback} Callback
 * @typedef {string} ServiceName
 */

const serviceDict = {};

/**
 * @param {ServiceName | {service: ServiceName, gid?: string}} configuration
 * @param {Callback} callback
 * @returns {void}
 */
function get(configuration, callback) {
  let name;
  if (configuration && typeof configuration === 'object') {
    name = configuration.service;
  } else {
    name = configuration;
  }

  if (!name) {
    return callback(new Error('no service name'));
  }

  // see if it exists 
  if (name in serviceDict) {
    return callback(null, serviceDict[name]);
  } else if (globalThis.distribution && globalThis.distribution.local[name]) {
    return callback(null, globalThis.distribution.local[name]);
  } else {
    return callback(new Error(`service "${name}" not found`));
  }
}

/**
 * @param {object} service
 * @param {string} configuration
 * @param {Callback} callback
 * @returns {void}
 */
function put(service, configuration, callback) {
  serviceDict[configuration] = service;
  if (callback) {
    return callback(null, configuration);
  }
}

/**
 * @param {string} configuration
 * @param {Callback} callback
 */
function rem(configuration, callback) {
  if (configuration in serviceDict) {
    const removed = serviceDict[configuration];
    delete serviceDict[configuration];
    return callback(null, removed);
  } else {
    return callback(new Error(`service "${configuration}" not found`));
  }
}

module.exports = {get, put, rem};
