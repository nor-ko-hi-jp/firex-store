"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirestoreReaderServiceFactory = void 0;
const services_1 = require("../../services");
/**
 * Factory of FirestoreSubscriber and FirestoreFinder
 * @param ref: firebase.firestore.DocumentReference | firebase.firestore.CollectionReference | firebase.firestore.Query
 * @method bindTo(statePropName): return FirestoreSubscriber
 * @method once: return FirestoreFinder
 * @method pipe(...args): return FirestoreStreamSubscriber
 */
class FirestoreReaderServiceFactory {
    constructor(ref) {
        this._ref = ref;
    }
    /**
     * Return FirestoreSubscriber instance
     * @param statePropName: state property bound to firestore data
     * @return FirestoreSubscriber
     */
    bindTo(statePropName) {
        return services_1.FirestoreSubscriber.from(this._ref).bindTo(statePropName);
    }
    /**
     * Return FirestoreFinder instance
     * @return FirestoreFinder
     */
    once() {
        return services_1.FirestoreFinder.from(this._ref);
    }
    /**
     * Subscribe firestore data like rxjs.
     * @see see a comparison of usage with `from(ref).bindTo(statePropName)`
     *  https://github.com/nor-ko-hi-jp/firex-store/blob/master/docs/v1/v1-usage.md#subscribe-firestore-using-like-rxjs
     * @description If you'd like to use helper method in pipe function, use stream-executor library.
     *  https://github.com/nor-ko-hi-jp/stream-executor#helper-methods-and-those-descriptions-in-createstream-are
     * @param act1 <T, U>(data: { isLast: boolean, data: T, bindTo: (statePropName: string) => void }) => U
     * @param act2 <T, U>(data: T) => U
     * @param act3 <T, U>(data: T) => U
     * @param act4 <T, U>(data: T) => U
     * @param act5 <T, U>(data: T) => U
     * @param act6 <T, U>(data: T) => U
     * @param act7 <T, U>(data: T) => U
     * @param act8 <T, U>(data: T) => U
     * @param act9 <T, U>(data: T) => U
     * @param act10 <T, U>(data: T) => U
     *
     * @example
     * import { from, map, bndTo, firestoreMutations } from 'firex-store'
     *
     * const toCharactor = (data) => ({ id: data.docId, name: `${data.first_name} ${data.family_name}` })
     *
     * export default {
     *   state: {
     *     charactors: null,
     *     isLoaded: false
     *   },
     *   mutations: {
     *     ...firestoreMutations('all'),
     *     setIsLoaded: (state, paylaod) => {
     *       state.charactors = payload
     *     }
     *   },
     *   actions: {
     *     subscribe: ({ commit, state }, { collectionName }) => {
     *       from(firebase.collections(collectionName))
     *         .pipe(
     *           map(toCharactor),
     *           bindTo('charactor'),
     *           ({ data }) => {
     *             commit('setIsLoaded', data)
     *           }
     *         )
     *         .subscribe(state, commit)
     *     }
     *   }
     * }
     */
    pipe(act1, act2, act3, act4, act5, act6, act7, act8, act9, act10) {
        return services_1.FirestoreStreamSubscriber.from(this._ref).pipe(act1, act2, act3, act4, act5, act6, act7, act8, act9, act10);
    }
}
exports.FirestoreReaderServiceFactory = FirestoreReaderServiceFactory;
