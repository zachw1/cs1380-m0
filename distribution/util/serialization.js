// @ts-check


function serializeHelper(object) {
  if (object === null) {
    return {type: 'null', value: ''};
  } else if (object === undefined) {
    return {type: 'undefined', value: ''};
  } else if (typeof object === 'number') {
    return {type: 'number', value: String(object)};
  } else if (typeof object === 'string') {
    return {type: 'string', value: object};
  } else if (typeof object === 'boolean') {
    return {type: 'boolean', value: String(object)};
  } else if (typeof object === 'function') {
    return {type: 'function', value: object.toString()};
  } else if (object instanceof Date) {
    return {type: 'date', value: object.toJSON()};
  } else if (object instanceof Error) {
    return {type: 'error', value: {name: object.name, message: object.message}};
  } else if (Array.isArray(object)) {
    return {type: 'array', value: object.map((el) => serializeHelper(el))};
  } else if (typeof object === 'object') {
    const result = {};
    for (const key in object) {
      result[key] = serializeHelper(object[key]);
    }
    return {type: 'object', value: result};
  }
}

function deserializeHelper(parsed) {
  const type = parsed.type;
  const value = parsed.value;

  if (type === 'number') {
    return Number(value);
  } else if (type === 'string') {
    return value;
  } else if (type === 'boolean') {
    return value === 'true';
  } else if (type === 'null') {
    return null;
  } else if (type === 'undefined') {
    return undefined;
  } else if (type === 'function') {
    return new Function('return ' + value)();
  } else if (type === 'date') {
    return new Date(value);
  } else if (type === 'error') {
    const err = new Error(value.message);
    err.name = value.name;
    return err;
  } else if (type === 'array') {
    return value.map((el) => deserializeHelper(el));
  } else if (type === 'object') {
    const result = {};
    for (const key in value) {
      result[key] = deserializeHelper(value[key]);
    }
    return result;
  }
}

/**
 * @param {any} object
 * @returns {string}
 */
function serialize(object) {
  return JSON.stringify(serializeHelper(object));
}

/**
 * @param {string} string
 * @returns {any}
 */
function deserialize(string) {
  if (typeof string !== 'string') {
    throw new Error(`Invalid argument type: ${typeof string}.`);
  }

  const parsed = JSON.parse(string);
  return deserializeHelper(parsed);
}

module.exports = {
  serialize,
  deserialize,
};
