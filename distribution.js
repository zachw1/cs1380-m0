#!/usr/bin/env node
/**
 * @typedef {import("./distribution/types.js").Node} Node
 */

const log = require('./distribution/util/log.js');

/**
 * @param {Node} [config]
 */
function bootstrap(config) {
  // @ts-ignore This is the first time globalThis.distribution is being initialized, so the object does not have all the necessary properties.
  globalThis.distribution = {};
  globalThis.distribution.util = require('./distribution/util/util.js');
  // @ts-ignore node.server is lazily initialized.
  globalThis.distribution.node = require('./distribution/local/node.js');
  globalThis.distribution.local = require('./distribution/local/local.js');

  if (config) {
    globalThis.distribution.node.config = config;
  }

  for (const [key, service] of Object.entries(globalThis.distribution.local)) {
    globalThis.distribution.local.routes.put(service, key, () => {});
  }

  const {setup} = require('./distribution/all/all.js');
  globalThis.distribution.all = setup({gid: 'all'});

  /* Overrides when missing functionality from previous milestone or extra credit is needed */

  // For M3, when missing RPC, its path through routes, and status.{spawn, stop}
  /* __start_M3_solution__
  const distributionLib = require('@brown-ds/distribution')(config);
  globalThis.distribution.util.wire.createRPC = distributionLib.util.wire.createRPC;
  globalThis.distribution.local.routes.get = distributionLib.local.routes.get;
  globalThis.distribution.local.status.spawn = distributionLib.local.status.spawn;
  globalThis.distribution.local.status.stop = distributionLib.local.status.stop;
  __end_M3_solution__ */
  return globalThis.distribution;
}

/*
  This logic determines which implementation of the distribution library to use.
  It can either be:
  1. The reference implementation from the library @brown-ds/distribution
  2. Your own, local implementation

  Which one to be used by the tests is determined by the value of the property "useLibrary" in the package.json file.
*/
// @ts-ignore JSON import resolved at runtime.
const {useLibrary} = require('./package.json');
// @ts-ignore Optional dependency for reference implementation.
const distribution = useLibrary ? require('@brown-ds/distribution') : bootstrap;

/* The following code is run when distribution.js is run directly */
if (require.main === module) {
  globalThis.distribution = distribution();
}

module.exports = distribution;
