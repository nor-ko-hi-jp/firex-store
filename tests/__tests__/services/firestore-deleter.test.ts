import { FirestoreDeleter } from '../../../src/services'
import { FirestoreRepository } from '../../../src/repositories/index'
import { firestore } from '../../mocks/firebase'
import * as firebase from 'firebase'
import * as flushPromises from 'flush-promises'
import { MockCollectionReference } from '../../mocks/mock-collection-reference'

describe('FirestoreDeleter', () => {
  it('return FirestoreDeleter instance', () => {
    const deleter = FirestoreDeleter.to(
      firestore.collection('comments').doc('commentId')
    )
    expect(deleter).toBeInstanceOf(FirestoreDeleter)
  })

  it('ref is DocumentReference instance', () => {
    const deleter = FirestoreDeleter.to(
      firestore.collection('comments').doc('commentId')
    )
    expect(deleter.ref).toBeInstanceOf(firebase.firestore.DocumentReference)
  })

  it('transaction is true', () => {
    const deleter = FirestoreDeleter.to(
      firestore.collection('comments').doc('commentId')
    )
    expect(deleter.isTransaction).toBeFalsy()
    expect(deleter.transaction().isTransaction).toBeTruthy()
  })

  it('FirestoreRepository.delete called with no transaction', async (done) => {
    const mockDeleter = jest.spyOn(FirestoreRepository, 'delete')
    const data = {} as any
    const deleter = FirestoreDeleter.to(
      new MockCollectionReference(data).doc(
        'documentId'
      ) as firebase.firestore.DocumentReference
    )
    const result = deleter.delete()
    await flushPromises()
    expect(FirestoreRepository.delete).toHaveBeenCalled()
    expect(mockDeleter.mock.calls[0][0].isTransaction).toBeFalsy()
    expect(result).toBeInstanceOf(Promise)
    jest.clearAllMocks()

    done()
  })
})
