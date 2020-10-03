'use strict';

const { always, cond, curry, equals, map, omit, T, type } = require('ramda');

const { castDocId, docId, modelId, removeUndefinedId } = require('./id');

const mapResultWith = curry((transform, result) =>
  cond([
    [equals('Array'), always(map(transform, result))],
    // else
    [T, always(transform(result))],
  ])(type(result))
);

const toModel = mapResultWith((item) => ({
  id: docId(item),
  ...omit(['_id'], item),
}));

const toDoc = mapResultWith((item) =>
  removeUndefinedId({
    _id: castDocId(modelId(item)),
    ...omit(['id'], item),
  })
);

module.exports = { toDoc, toModel, mapResultWith };
