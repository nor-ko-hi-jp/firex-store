import { MutationType } from './mutation-type.type';
/**
 * type: 'document' | 'collection'.
 * isAll: It's undefined in case of 'document' type. it is true if QuerySnaphsot.empty is empty.
 */
export declare type NotFoundHandler = (type?: MutationType, isAll?: boolean) => void;
