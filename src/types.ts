export interface Constructor<T> {
  new(...args: any[]): T;
}

export type Dependency<T> = Constructor<T> | Function | symbol;
export type ClassDecorator<T> = (target: T) => void;
