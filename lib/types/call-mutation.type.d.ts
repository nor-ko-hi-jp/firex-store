import { firestore } from 'firebase';
import { Payload } from '../models';
export declare type CallMutation = (changeType: firestore.DocumentChangeType, payload: Omit<Payload, 'statePropName'>) => void;
