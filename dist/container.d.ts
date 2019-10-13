import 'reflect-metadata';
import { Dependency, Constructor } from './types';
/** DI Container */
export declare class Container {
    private readonly singletons;
    private readonly registredTypes;
    private resolvedCount;
    static objectsCount: number;
    registerType<T>(type: Dependency<T>, target: Constructor<any> | string | object | number): this;
    get<T>(type: Dependency<T>): T;
}
