export interface Type<T> {
    new (...args: any[]): T;
}
export interface ProvidersOptions {
    provide: DependencyType<any>;
    useClass?: Type<any>;
}
export interface Provider {
    target: Type<any>;
    deps: DependencyType<any>[];
}
export declare type DependencyType<T> = Type<T> | Function | symbol;
export declare type ClassDecorator<T> = (target: T) => void;
