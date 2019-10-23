import { ActionTree } from 'vuex';
import { SubscribeCriteriaOptions } from '../../options';
import { FirestoreSubscriber } from '../../services/firestore-subscriber.service';
interface CriteriaOptions<T> extends SubscribeCriteriaOptions<T> {
    /**
     * @param actionName action name registered to ActionTree
     */
    actionName?: string;
}
/**
 * @description subscribe firestore data to state property
 * @param firestoreSubscriber: FirestoreSubscriber instance
 * @param options: {
 *         actionName,
 *         mapper,
 *         errorHandler,
 *         notFoundHandler,
 *         completionHandler
 *         afterMutationCalled } | undefined
 *
 * @example
 *   actions: {
 *     ...firestoreSubscribeAction(
 *       FirestoreSubscriber
 *         .from(firebase.firestore().collection('/comments'))
 *         .bindTo('comments'),
 *       { actionName: 'subscribeAll' }
 *     )
 *   }
 *
 */
export declare const firestoreSubscribeAction: (firestoreSubscriber: FirestoreSubscriber, options?: CriteriaOptions<any> | undefined) => ActionTree<any, any>;
export {};