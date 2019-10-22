
## Usage

- [Subscribe Firestore, using firex-store actions](#1-subscribe-firestore-using-firex-store-actions)
- [Subscribe Firestore, using custom actions](#2-subscribe-firestore-using-custom-actions)
- [Unsubscribe Firestore, using firex-store actions](#3-unsubscribe-firestore-using-firex-store-actions)
- [Unsubscribe Firestore, using custom actions](#4-unsubscribe-firestore-using-custom-actions)
- [Fetch at Once](#5-fetch-at-once)
- [Options](#options)

### Before Start...

- You have to initailize firebase

```javascript
.....

firebase.initializeApp({
  apiKey: [your firebase api key],
  projectId: [your project id],
  .....
})

export const firestore = firebase.firestore()
```

### Import Path
- `import {  } from 'firex-store/v1alpha'`

### 1. Subscribe Firestore, using firex-store actions

- method: `firestoreMutations`
- parameters:
  - type: 'document' | 'collection' | 'all'
    - all: 'document' and 'collection'

- method: `firestoreSubscribeAction`
- parameters:
  - firestoreSubscriber: FirestoreSubscriber instance
  - options?: 
    - actionName: string | undefined
    - see [Options](#options)

- class: `FirestoreSubscriber`
- class methods:
  - from: Make instance
    - parameter:
      - ref: firebase.firestore.DocumentReference | firebase.firestore.CollectionReference | firebase.firestore.Query
    - return:
      - FirestoreSubscriber
  - bindTo: Bind subscribe data to state property
    - parameter:
      - statePropName: string. state property
    - return:
      - FirestoreSubscriber

Ex. Subscribe collection and document

#### part1. Set Store
```javascript
import { firestoreMutations, firestoreSubscribeAction, FirestoreSubscriber } from 'firex-store/v1alpha'

// modules: comment
export default {
  namespaced: true,
  state: {
    comments: [],
    comment: null
  },
  mutations: {
    ...firestoreMutations('collection'),
    ...firestoreMutations('document')
    // or `...firestoreMutations('all')`
  },
  actions: {
    ...firestoreSubscribeAction(
      FirestoreSubscriber
        .from(firebase.firestore().collection('/comments'))
        .bindTo('comments')  // property name in state
    ),
    ...firestoreSubscribeAction(
      FirestoreSubscriber
        .from(firebase.firestore().collection('/comments').doc('commentId'))
        .bindTo('comment'),  // property name in state,
        { actionName: 'subscribeComment' }
    ),
  }
.....
}
```

#### part2. Call action

```javascript
<script>
import { actionTypes } from 'firex-store/v1alpha'

export default {
  name: 'Comments',
  created() {
    this.$store.dispatch(`comment/${actionTypes.collection.SUBSCRIBE}`)
    this.$store.dispatch(`comment/subscribeComment`) // subscribe: actionName you defined in part1
  }
}

</script>
```

### 2. Subscribe Firestore, using custom actions

- method: `firestoreMutations`
- parameters:
  - type: 'document' | 'collection' | 'all'
    - all: 'document' and 'collection'

- class: `FirestoreSubscriber`
- class methods:
  - from: Make instance
    - parameter:
      - ref: firebase.firestore.DocumentReference | firebase.firestore.CollectionReference | firebase.firestore.Query
    - return:
      - FirestoreSubscriber
  - bindTo: Bind subscribe data to state property
    - parameter:
      - statePropName: string. state property
    - return:
      - FirestoreSubscriber
  - subscribe: Subscribe firestore data
    - parameters:
      - state: any
      - commit: Commit
      - options?: 
        - see [Options](#options)

Ex. Subscribe collection

#### part1. Set Store
```javascript
import { firestoreMutations, firestoreSubscribeAction, FirestoreSubscriber } from 'firex-store/v1alpha'

// modules: comment
export default {
  namespaced: true,
  state: {
    comments: []
  },
  mutations: {
    ...firestoreMutations('collection')
  },
  actions: {
    subscribeAll: ({ state, commit }) => {
      FirestoreSubscriber
        .from(firebase.firestore().collection('/comments'))
        .bindTo('comments')
        .subscribe(state, commit)
    }
  }
.....
}
```

#### part2. Call action

```javascript
<script>

export default {
  name: 'Comments',
  created() {
    this.$store.dispatch(`user/subscribeAll`)
  }
}

</script>
```


### 3. Unsubscribe Firestore, using firex-store actions

Ex. Unsubscribe collection

#### part1. Set Store

- method: `firestoreUnsubscribeAction`
- argments:
  - firestoreUnsubscriber: FirestoreUnsubscriber instance
  - actionName: string | undefined

- class `FirestoreUnsubscriber`
- class method:
  - unbind: Make FirestoreUnsubscriber instance
    - parameter:
      - type: 'document' |  'collection'
    - return:
      - FirestoreUnsubscriber

```javascript
import { firestoreMutations, firestoreSubscribeAction, firestoreUnsubscribeAction, FirestoreSubscriber, FirestoreUnsubscriber } from 'firex-store/v1alpha'
// modules: comment
export default {
  namespaced: true,
  state: {
    comments: [],
    comment: null
  },
  mutations: {
    ...firestoreMutations('all')
  },
  actions: {
    ...firestoreSubscribeAction(
      FirestoreSubscriber
        .from(firebase.firestore().collection('/comments'))
        .bindTo('comments')
    )
    ...firestoreSubscribeAction(
      FirestoreSubscriber
        .from(firebase.firestore().collection('/comments').doc('commentId'))
        .bindTo('comment')
    )
    ...firestoreUnsubscribeAction(
      FirestoreUnsubscriber
        .unbind('collection')
    )
    ...firestoreUnsubscribeAction(
      FirestoreUnsubscriber
        .unbind('document'),
      'unsubscribe'
    )
  }
.....
}
```

#### part2. Call action

```javascript
<script>
import { actionTypes } from 'firex-store/v1alpha'

export default {
  name: 'Comments',
  created() {
    this.$store.dispatch(`comment/${actionTypes.collection.SUBSCRIBE}`)
    this.$store.dispatch(`comment/${actionTypes.document.SUBSCRIBE}`)
    this.$store.dispatch(`comment/${actionTypes.collection.UNSUBSCRIBE}`)
    this.$store.dispatch(`comment/unsubscribe`)
  }
}

</script>
```

### 4. Unsubscribe Firestore, using custom actions

- class `FirestoreUnsubscriber`
- class method:
  - unbind: Make FirestoreUnsubscriber instance
    - parameter:
      - type: 'document' |  'collection'
    - return:
      - FirestoreUnsubscriber
  - unsubscribe:
    - parameter:
      - state: any

```javascript
import { firestoreMutations, firestoreSubscribeAction, FirestoreSubscriber } from 'firex-store/v1alpha'

// modules: comment
export default {
  namespaced: true,
  state: {
    comments: []
  },
  mutations: {
    ...firestoreMutations('collection')
  },
  actions: {
    subscribeAll: ({ state, commit }) => {
      FirestoreSubscriber
        .from(firebase.firestore().collection('/comments'))
        .bindTo('comments')
        .subscribe(state, commit)
    },
    unsubscribeAll: ({ state }) => {
      FirestoreUnsubscriber
        .unbind('collection')
        .unsubscribe(state)
    }
  }
.....
}
```

#### part2. Call action

```javascript
<script>

export default {
  name: 'Comments',
  created() {
    this.$store.dispatch(`user/subscribeAll`)
    this.$store.dispatch(`user/unsubscribeAll`)
  }
}

</script>
```

## 5. Fetch at once

- class: `FirestoreFetcher`
- class methods:
  - where: Make instance
    - parameter:
      - ref: firebase.firestore.DocumentReference | firebase.firestore.CollectionReference | firebase.firestore.Query
    - return:
      - FirestoreSubscriber
  - fetch: fetch firestore data at once
    - parameter:
      - options?: 
        - see [Options](#options)

EX. Call in Store Action, to fetch collection

```javascript
export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchComments: async ({ commit }) => {
      const mapComment = (data) => ({ message: data.message, user: { firstName: data.user.first_name, familyName: data.user.family_name } })
      const ref = firestore.collection('/comments')
      const result = await FirestoreFetcher
        .where(ref)
        .fetch({ mapper: mapComment })
      commit(***, result)
    }
  }
}
```

## Options

- Options

  - mapper:

    - Map to something. State prop bound to Firestore or return values map to something if mapper defined

  - errorHandler

    - If it defined, call it when error occured. But if not, call `console.error(error)`

  - CompletionHandler

    - If it defined, call it when completed

  - afterMutationCalled

    - `subscribeFirestore` and `subscribeFirestoreActions` only.
    - If it defined, call it when completed
    - This method called after mutation called
    - @param payload
      - type payload = {
         - data: { docId: string | null, [key: string]: any }, <-- subscribed data
        - isLast: boolean,  <-- In 'document' subscribed , it undefined. In 'collection' subscribed, true or false.
          - UseCase: disappear and appear loading bar when subscribed 'collection' data at first
        - statePropName: string <-- state property bound subscribe data to 
        - [key: string]: any }


  - notFoundHandler
    - If it defined, call it when snapshot doesn't exist
    - @param type: 'document' | 'collection'
    - @param isAll:
      - undefined  when subscribe Document data
      - true       when subscribe Collection data
      - false      when subscribe Collection data and document in Collection is not existed
    
Ex.

```javascript
const mapUser = (data) => ({
  id: data.id
  name: data.name
  .....
})
```

```javascript
const errorHandler = (error) => {
  console.error(`[App Name]:  ${error}`)
}
```

```javascript
const completionHandler = () => {
  console.log('completed!')
}
```

```javascript
const afterMutationCalled = (payload) => {
  /**
   * payload = {
   *   data: { docId: string | null, [key: string]: any },
   *   isLast: boolean,
   *   statePropName: string
   *   [key: string]: any
   * }
   * */
  if (payload.isLast === false) {
    commit('SET_LOADING', true)
  } else if (payload.isLast === true) {
    commit('SET_LOADING', false)
  }
}
```

```javascript
const notFoundHandler = (type, isAll) => {
  console.log('not found')
}
```

```javascript
const notFoundHandler = (type, isAll) => {
  console.log('not found')
}
```

```javascript
export default {
  namespaced: true,
  state: {
    comments: [],
    comment: null,
    isLoading: false
  },
  mutations: {
    ...firestoreMutations('collection'),
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading
    }
  },
  actions: {
    subscribe: ({ state, commit }) => {
      FirestoreSubscriber
        .from(firestore.collection('/comments'))
        .bindTo('comments')
        .subscribe(state, commit, {
          mapper: mapUser,
          errorHandler,
          completionHandler,
          afterMutationCalled,
          notFoundHandler
        })
    }
  }
  .....
}

```