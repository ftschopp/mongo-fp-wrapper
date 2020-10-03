'use strict';
const { either, isEmpty, isNil } = require('ramda');

const isNilOrEmpty = either(isNil, isEmpty);

module.exports = isNilOrEmpty;
