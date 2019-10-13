import { DependencyType, Type } from './types';
import 'reflect-metadata';
/** DI Container */
export declare class Container {
    private readonly singletons;
    private readonly registredTypes;
    private resolvedCount;
    static objectsCount: number;
    registerType<T>(type: DependencyType<T>, target: Type<any> | string | object | number): this;
    get<T>(type: DependencyType<T>): T;
}
