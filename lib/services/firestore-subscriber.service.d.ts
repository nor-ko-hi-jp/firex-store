import { Subscriber } from '../models';
import { FirestoreRef } from '../types';
import { Commit } from 'vuex';
import { SubscribeOptionsParameter } from '../parameters';
/**
 * Class subscribe firestore data to state property
 *
 * @example
 *   FirestoreSubscriber
 *     .from(firebase.firestore().collection('collection'))
 *     .bindTo('statePropName')
 *     .subscribe(state, commit, {
 *         mapper,
 *         errorHandler,
 *         notFoundHandler,
 *         afterMutationCalled
 *     })
 */
export declare class FirestoreSubscriber implements Subscriber {
    private _ref;
    private _statePropName?;
    /**
     * Make FirestoreSubscriber instance
     * @param ref: firebase.firestore.DocumentReference | firebase.firestore.CollectionReference | firebase.firestore.Query
     * @returns FirestoreSubscriber
     */
    static from(ref: FirestoreRef): FirestoreSubscriber;
    constructor(ref: FirestoreRef);
    readonly ref: FirestoreRef;
    readonly statePropName: string | undefined;
    /**
     * Set state property bound to firestore data
     * @param statePropName: string
     * @returns FirestoreSubscriber
     */
    bindTo(statePropName: string): FirestoreSubscriber;
    /**
     * Subscribe firestore data and bind to state property
     * @param state: any
     * @param commit: Commit
     * @param options: { mapper,
     *         errorHandler,
     *         notFoundHandler,
     *         completionHandler
     *         afterMutationCalled } | undefined
     */
    subscribe<T = any>(state: any, commit: Commit, options?: SubscribeOptionsParameter<T>): void;
    isDocumentRef(): boolean;
}
