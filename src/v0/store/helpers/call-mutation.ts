import { Commit } from 'vuex'
import { mutationTypes } from '../types/mutation'
import { MutationType } from '../../types'
import { Payload } from '../../models'

interface Criteria {
  mutationType: MutationType
  changeType: firebase.firestore.DocumentChangeType
  commit: Commit
  payload: Payload
}

export const callMutation = ({
  mutationType,
  changeType,
  commit,
  payload,
}: Criteria) => {
  const types =
    mutationType === 'document'
      ? mutationTypes.document
      : mutationTypes.collection
  switch (changeType) {
    case 'added':
      commit(types.ADD, payload)
      break
    case 'modified':
      commit(types.MODIFY, payload)
      break
    default:
      commit(types.REMOVE, payload)
      break
  }
}
