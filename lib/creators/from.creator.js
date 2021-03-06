"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.from = void 0;
const helpers_1 = require("./helpers");
/**
 * Return factory of FirestoreSubscriber and FirestoreFinder
 * @param ref: firebase.firestore.DocumentReference | firebase.firestore.CollectionReference | firebase.firestore.Query
 * @returns FirestoreReaderServiceFactory
 */
exports.from = (ref) => new helpers_1.FirestoreReaderServiceFactory(ref);
