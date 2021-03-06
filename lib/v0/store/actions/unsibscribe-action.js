"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firestoreUnsubscribeAction = exports.firestoreUnsubscribeActions = void 0;
const action_1 = require("../types/action");
const helpers_1 = require("../helpers");
/**
 * @warn It is deprecated. It will be removed at `^1.0.0~`
 *  unsubscribe firestore data
 * @param type 'document' | 'collection'
 * @param actionName can undefined. But if you define actionName in `firestoreSubscribeActions`, set same name.
 */
exports.firestoreUnsubscribeActions = ({ type, actionName, }) => {
    const defaultActionName = type === 'document'
        ? action_1.actionTypes.document.UNSUBSCRIBE
        : action_1.actionTypes.collection.UNSUBSCRIBE;
    const action = actionName ? actionName : defaultActionName;
    const tree = {
        [action]({ state }) {
            helpers_1.unsubscribeFirestore({ state, type });
        },
    };
    return tree;
};
/**
 *  unsubscribe firestore data
 * @param type 'document' | 'collection'
 * @param actionName can undefined. But if you define actionName in `firestoreSubscribeAction`, set same name.
 */
exports.firestoreUnsubscribeAction = ({ type, actionName, }) => {
    const defaultActionName = type === 'document'
        ? action_1.actionTypes.document.UNSUBSCRIBE
        : action_1.actionTypes.collection.UNSUBSCRIBE;
    const action = actionName ? actionName : defaultActionName;
    const tree = {
        [action]({ state }) {
            helpers_1.unsubscribeFirestore({ state, type });
        },
    };
    return tree;
};
