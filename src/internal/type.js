const { equals, flip, pipe, type, uncurryN } = require('ramda');

const isTypeOf = flip(uncurryN(2, pipe(type, equals)));
const isError = isTypeOf('Error');
const isFunction = isTypeOf('Function');
const isPromise = isTypeOf('Promise');
const isString = isTypeOf('String');
const isArray = isTypeOf('Array');

module.exports = {
  isTypeOf,
  isError,
  isFunction,
  isPromise,
  isString,
  isArray,
};
