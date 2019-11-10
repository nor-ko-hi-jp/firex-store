import { AppErrorOr } from '../types'
import { MergeSetter, Transaction } from '../models'
import { FirestoreRepository } from '../repositories'
import { SetCriteriaOptions } from '../options'

export class FirestoreMergeSetter implements MergeSetter, Transaction {
  private _ref: firebase.firestore.DocumentReference
  private _isTransaction = false

  static to(ref: firebase.firestore.DocumentReference): FirestoreMergeSetter {
    return new FirestoreMergeSetter(ref)
  }

  constructor(ref: firebase.firestore.DocumentReference) {
    this._ref = ref
  }

  get ref(): firebase.firestore.DocumentReference {
    return this._ref
  }

  get isTransaction(): boolean {
    return this._isTransaction
  }

  transaction(): FirestoreMergeSetter {
    this._isTransaction = true
    return this
  }

  async mergeSet<T = any>(
    data: any,
    options?: SetCriteriaOptions<T>
  ): Promise<AppErrorOr<void>> {
    const _data = { ...data }
    const result = await FirestoreRepository.set({
      data: _data,
      ref: this._ref,
      isTransaction: this.isTransaction,
      ...options,
      merge: true
    })

    return result
  }
}
