import 'reflect-metadata';
import { Constructor, ClassDecorator, Dependency } from './types';
export declare const DEPENDENCIES_MEDATADA_KEY = "dependencies:list";
/**
 * Injectable decorator
*/
export declare const Injectable: () => ClassDecorator<Constructor<object>>;
/**
 * Inject decorator
 * @param {Dependency<T>} dependency dependency type
*/
export declare const Inject: <T>(dep: Dependency<T>) => (target: Constructor<any>, _: string | symbol, parameterIndex: number) => void;
