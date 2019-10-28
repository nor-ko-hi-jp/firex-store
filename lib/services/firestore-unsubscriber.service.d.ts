import { Unsubscriber } from '../models';
/**
 * @description class unsubscribe firestore data to state property
 *
 * @example
 *   FirestoreUnsubscriber
 *     .on('statePropName')
 *     .unsubscribe(state)
 */
export declare class FirestoreUnsubscriber implements Unsubscriber {
    private _statePropName;
    /**
     * @description Make FirestoreUnsubscriber instance
     * @param statePropName: string
     * @returns FirestoreUnsubscriber
     */
    static on(statePropName: string): FirestoreUnsubscriber;
    constructor(statePropName: string);
    readonly statePropName: string;
    /**
     * @description unsubscribe firestore data
     * @param state: any
     */
    unsubscribe(state: any): void;
}
