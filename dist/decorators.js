import 'reflect-metadata';
import { add } from './util';
import { Container } from './container';
export const DEPENDENCIES_MEDATADA_KEY = 'dependencies:list';
/**
 * Injectable decorator
*/
export const Injectable = () => (target) => {
    const deps = Reflect.getMetadata('design:paramtypes', target) || [];
    Reflect.defineMetadata(DEPENDENCIES_MEDATADA_KEY, deps, target);
    Container.objectsCount++;
};
/**
 * Inject decorator
 * @param {DependencyType<T>} dependency dependency type
*/
export const Inject = (dep) => (target, _, parameterIndex) => {
    const definedDeps = Reflect.getMetadata(DEPENDENCIES_MEDATADA_KEY, target) || [];
    const deps = definedDeps.length
        ? definedDeps
        : Reflect.getMetadata('design:paramtypes', target) || [];
    const updated = add(deps, dep, parameterIndex);
    Reflect.defineMetadata(DEPENDENCIES_MEDATADA_KEY, updated, target);
    Container.objectsCount++;
};
