
import 'reflect-metadata';

import { Container } from './container';
import { Constructor, ClassDecorator, Dependency } from './types';
import { add } from './util';

export const DEPENDENCIES_MEDATADA_KEY = 'dependencies:list';

/**
 * Injectable decorator
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
