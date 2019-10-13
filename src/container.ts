import 'reflect-metadata';

import { DEPENDENCIES_MEDATADA_KEY } from './decorators';
import { Dependency, Constructor } from './types';
import { isFunction, isSymbol } from './util';

/**
 * DI Container
 * 
 * Each container instance contains own class instance
 * */
export class Container {

  private readonly singletons = new Map<Constructor<any>, any>();
  private readonly registredTypes = new Map<Dependency<any>, any>();
  private resolvedCount = 0;
  static objectsCount = 0;

  registerType<T>(type: Dependency<T>, target: Constructor<any> | string | object | number) {
    this.registredTypes.set(type, target);
    return this;
  }

  get<T>(type: Dependency<T>): T {
    const targetName = isFunction(type) ? type.name : Symbol.keyFor(type);
    const target = this.registredTypes.get(type) || type as Constructor<T>;

    if (!target || isSymbol(target)) {
      throw new Error(`No provider for ${targetName}`)
    }

    if (!isFunction(target)) {
      return target;
    }

    const deps: Dependency<any>[] = Reflect.getMetadata(DEPENDENCIES_MEDATADA_KEY, target) || [];

    if (this.singletons.has(target)) {
      return this.singletons.get(target);
    }

    if (this.resolvedCount > Container.objectsCount) {
      throw new Error(`Circular dependency of ${targetName}`)
    }

    this.resolvedCount++;
    const instance = new target(...deps.map(d => this.get(d)));
    this.singletons.set(target, instance);

    return instance;
  }
}
