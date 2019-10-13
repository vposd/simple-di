
import 'reflect-metadata';

import { Constructor, ClassDecorator, Dependency } from './types';
import { Container } from './container';
import { add } from './util';

export const DEPENDENCIES_MEDATADA_KEY = 'dependencies:list';

/**
 * Injectable decorator
 * 
 * Class decorator adds class to global registry and add to container by default.
 * 
 * Each container has different class instance.
 * 
 * ### Example
 * ```
 * @Injectable()
 * class Some {
 *   constructor(private dep: Dependency) { }
 * }
 *
 * const container = new Container();
 * const instance = container.get(Some);
 * ```
*/
export const Injectable = (): ClassDecorator<Constructor<object>> =>
  (target: Constructor<object>) => {
    const deps: Constructor<any>[] = Reflect.getMetadata('design:paramtypes', target) || [];
    Reflect.defineMetadata(DEPENDENCIES_MEDATADA_KEY, deps, target)
    Container.objectsCount++;
  }

/**
 * Inject decorator
 * @param {Dependency<T>} dependency dependency type
 * 
 * Parameter decorator allows inject interface and other object and non-object values.
 * 
 * ### Example with interface
 * ```
 * const Worker = Symbol.for('Worker');
 * 
 * interface Worker {
 *   run();
 * }
 * 
 * class Task implements Worker {
 *  run() { }
 * }
 * 
 * class App {
 * constructor(
 *   @Inject(Worker) private worker: Worker
 *  ) { }
 * }
 * 
 * const container = new Container().registerType(Worker, Task);
 * const instance = container.get(Worker);
 * ```
*/
export const Inject = <T>(dep: Dependency<T>) =>
  (target: Constructor<any>, _: string | symbol, parameterIndex: number) => {
    const definedDeps = Reflect.getMetadata(DEPENDENCIES_MEDATADA_KEY, target) || [];
    const deps = definedDeps.length
      ? definedDeps
      : Reflect.getMetadata('design:paramtypes', target);
    const updated = add(deps, dep, parameterIndex);
    Reflect.defineMetadata(DEPENDENCIES_MEDATADA_KEY, updated, target);
    Container.objectsCount++;
  }
