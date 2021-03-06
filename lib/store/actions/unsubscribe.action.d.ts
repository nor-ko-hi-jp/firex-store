import { ActionTree } from 'vuex';
import { Unsubscriber } from '../../models';
/**
 * Unsubscribe firestore data to state property
 * @param firestoreUnsubscriber: FirestoreUnsubscriber instance
 * @param parameter: { type: 'document' | 'collection', actionName?: string }
 * @returns ActionTree<any, any>
 *
 * @example
 *   import { firestoreUnsubscribeAction, FirestoreUnsubscriber, on } from 'firex-store'
 *
 *   actions: {
 *     ...firestoreUnsubscribeAction(
 *       FirestoreUnsubscriber
 *         .on('statePropName'),
 *       { type: 'collection', actionName: 'customActionName' }
 *     ),
 *     ....firestoreUnsubscribeAction(
 *       on('statePropName'),
 *       { type: 'collection', actionName: 'customActionName2' }
 *     )
 *   }
 *
 */
export declare const firestoreUnsubscribeAction: (firestoreUnsubscriber: Unsubscriber, parameter: {
    type: 'document' | 'collection';
    actionName?: string;
}) => ActionTree<any, any>;
