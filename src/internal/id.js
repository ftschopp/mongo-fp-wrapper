'use strict';
const { isNil, omit, pipe, prop, when } = require('ramda');
const { ObjectId } = require('mongodb');

const docId = prop('_id');
const modelId = prop('id');
const castDocId = (id) => {
  if (typeof id === 'number') {
    return id;
  }

  return when(ObjectId.isValid, ObjectId)(id);
};
const withoutId = omit(['_id']);
const removeUndefinedId = when(pipe(docId, isNil), omit(['_id']));

module.exports = { docId, modelId, castDocId, withoutId, removeUndefinedId };
