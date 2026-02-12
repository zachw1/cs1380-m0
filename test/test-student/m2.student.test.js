/*
    In this file, add your own test cases that correspond to functionality introduced for each milestone.
    You should fill out each test case so it adequately tests the functionality you implemented.
    You are left to decide what the complexity of each test case should be, but trivial test cases that abuse this flexibility might be subject to deductions.

    Imporant: Do not modify any of the test headers (i.e., the test('header', ...) part). Doing so will result in grading penalties.
*/

const distribution = require('../../distribution.js')();
require('../helpers/sync-guard');

// returns proper ip
test('(1 pts) student test', (done) => {
  const local = distribution.local;
  const config = distribution.node.config;
  local.status.get('ip', (e, v) => {
    try {
      expect(e).toBeFalsy();
      expect(v).toBe(config.ip);
      done();
    } catch (error) {
      done(error);
    }
  });
});

// routes.put then routes.get retrieves the service
test('(1 pts) student test', (done) => {
  const local = distribution.local;
  const myService = {
    james: () => 'harden',
  };
  local.routes.put(myService, 'myService', (e, v) => {
    local.routes.get('myService', (e, v) => {
      try {
        expect(e).toBeFalsy();
        expect(v.james()).toBe('harden');
        done();
      } catch (error) {
        done(error);
      }
    });
  });
});

// routes.get returns error for nonexistent service
test('(1 pts) student test', (done) => {
  const local = distribution.local;
  local.routes.get('doesNotExist', (e, v) => {
    try {
      expect(e).toBeInstanceOf(Error);
      expect(v).toBeFalsy();
      done();
    } catch (error) {
      done(error);
    }
  });
});

// comm.send to local node status.get returns port
test('(1 pts) student test', (done) => {
  const local = distribution.local;
  const config = distribution.node.config;
  const remote = {node: config, service: 'status', method: 'get'};
  local.comm.send(['port'], remote, (e, v) => {
    try {
      expect(e).toBeFalsy();
      expect(v).toBe(config.port);
      done();
    } catch (error) {
      done(error);
    }
  });
});

// comm.send returns error for invalid service
test('(1 pts) student test', (done) => {
  const local = distribution.local;
  const config = distribution.node.config;
  const remote = {node: config, service: 'randoService', method: 'get'};
  local.comm.send([], remote, (e, v) => {
    try {
      expect(e).toBeInstanceOf(Error);
      expect(v).toBeFalsy();
      done();
    } catch (error) {
      done(error);
    }
  });
});

beforeAll((done) => {
  distribution.node.start((e) => {
    done(e);
  });
});

afterAll((done) => {
  if (globalThis.distribution.node.server) {
    globalThis.distribution.node.server.close();
  }
  done();
});
