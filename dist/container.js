import { isFunction, isSymbol } from './util';
import 'reflect-metadata';
import { DEPENDENCIES_MEDATADA_KEY } from './decorators';
/** DI Container */
export class Container {
    constructor() {
        this.singletons = new Map();
        this.registredTypes = new Map();
        this.resolvedCount = 0;
    }
    registerType(type, target) {
        this.registredTypes.set(type, target);
        return this;
    }
    get(type) {
        const targetName = isFunction(type) ? type.name : Symbol.keyFor(type);
        const target = this.registredTypes.get(type) || type;
        if (!target || isSymbol(target)) {
            throw new Error(`No provider for ${targetName}`);
        }
        if (!isFunction(target)) {
            return target;
        }
        const deps = Reflect.getMetadata(DEPENDENCIES_MEDATADA_KEY, target) || [];
        if (this.singletons.has(target)) {
            return this.singletons.get(target);
        }
        if (this.resolvedCount > Container.objectsCount) {
            throw new Error(`Circular dependency of ${targetName}`);
        }
        this.resolvedCount++;
        const instance = new target(...deps.map(d => this.get(d)));
        this.singletons.set(target, instance);
        return instance;
    }
}
Container.objectsCount = 0;
