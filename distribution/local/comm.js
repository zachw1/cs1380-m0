// @ts-check
/**
 * @typedef {import("../types.js").Callback} Callback
 * @typedef {import("../types.js").Node} Node
 */

const http = require('node:http');

/**
 * @typedef {Object} Target
 * @property {string} service
 * @property {string} method
 * @property {Node} node
 * @property {string} [gid]
 */

/**
 * @param {Array<any>} message
 * @param {Target} remote
 * @param {(error: Error, value?: any) => void} callback
 * @returns {void}
 */
function send(message, remote, callback) {
  // validate
  if (message !== undefined && message !== null && !Array.isArray(message)) {
    return callback(new Error('message must be an array'));
  }

  // check remote
  if (!remote || !remote.node || !remote.node.ip || !remote.node.port || !remote.service || !remote.method) {
    return callback(new Error('invalid remove'));
  }
  
  const gid = remote.gid || 'local';
  const path = `/${gid}/${remote.service}/${remote.method}`;
  const serialized = globalThis.distribution.util.serialize(message || []);

  const options = {
    hostname: remote.node.ip,
    port: remote.node.port,
    path: path,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      const deserialized = globalThis.distribution.util.deserialize(data);
      if (Array.isArray(deserialized)) {
        return callback(deserialized[0], deserialized[1]);
      } else if (deserialized instanceof Error) {
        return callback(deserialized);
      } else {
        return callback(new Error('incorrect response format'));
      }
    });
  });

  req.on('error', (e) => {
      return callback(e);
  });

  req.write(serialized);
  req.end();
}

module.exports = {send};
