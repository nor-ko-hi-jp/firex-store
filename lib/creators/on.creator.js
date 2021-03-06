"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.on = void 0;
const services_1 = require("../services");
/**
 * Return FirestoreUnsubscriber instance
 * @param statePropName state property bound to firestore data
 * @returns FirestoreUnsubscriber
 */
exports.on = (statePropName) => services_1.FirestoreUnsubscriber.on(statePropName);
