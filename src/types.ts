export interface Constructor<T> {
  new(...args: any[]): T;
}

export interface ProvidersOptions {
  provide: Dependency<any>,
  useClass?: Constructor<any>,
}

export interface Provider {
  target: Constructor<any>,
  deps: Dependency<any>[]
}

export type Dependency<T> = Constructor<T> | Function | symbol;
export type ClassDecorator<T> = (target: T) => void;