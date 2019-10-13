import { Type, ClassDecorator, DependencyType } from './types';
import 'reflect-metadata';
export declare const DEPENDENCIES_MEDATADA_KEY = "dependencies:list";
/**
 * Injectable decorator
*/
export declare const Injectable: () => ClassDecorator<Type<object>>;
/**
 * Inject decorator
 * @param {DependencyType<T>} dependency dependency type
*/
export declare const Inject: <T>(dep: DependencyType<T>) => (target: Type<any>, _: string | symbol, parameterIndex: number) => void;
