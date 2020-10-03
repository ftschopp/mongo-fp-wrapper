const { cond, curry, identity, T } = require('ramda');

const { isFunction, isPromise, isString } = require('./internal/type');
const { createClient } = require('./client');

/**
 * Takes a {@link MongoClientLike} and a database name, then returns `Promise` which resolves
 * [MongoDB Db Object](http://mongodb.github.io/node-mongodb-native/3.5/api/Db.html).
 *
 * It returns the original MongoDB {@link Db} object so it can be used to perform
 * all Db operations that MongoDB provides.
 *
 * It is a curried function so it can be partially recomposed.
 * Since [Ramda](https://ramdajs.com/) is used for currying, you can also use [R.__](https://ramdajs.com/docs/#__)
 * placeholder to allow partial application of any combination of arguments of this particular function.
 *
 * @func useDb
 * @type Function
 * @since v0.1.0
 * @param {MongoClientLike} client {@link MongoClient} instance
 * @param {string} databaseName Database name to get {@link Db} object of.
 * @return {Promise} Promise resolving MongoDB {@link Db} Object.
 * @see {@link useCollection}, {@link createClient}
 * @example
 *
 *      // complete usage
 *      // See createClient docs for more information
 *      const client = createClient(...params);
 *
 *      useDb(client, 'databaseName').then(db => {
 *        return collection.find({}).toArray();
 *      });
 *
 *      // partial re-usability
 *      const useDbInSomeClient = useDb(someClient, R.__);
 *      useDbInSomeClient('someDb').then(someDb => {});
 *      useDbInSomeClient('someOtherDb').then(someOtherDb => {}); *
 */
const useDb = curry((client, databaseName) => {
  const clientPromise = cond([
    [isString, createClient],
    [isFunction, (fn) => fn()],
    [isPromise, identity],
    [T, (obj) => Promise.resolve(obj)],
  ])(client);

  return clientPromise.then((c) => c.db(databaseName));
});

module.exports = useDb;
