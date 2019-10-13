import { Container } from '../src/container';
import { Inject, Injectable } from '../src/decorators';

describe('Inject decorator', () => {
  const TYPES = {
    Engine: Symbol.for('Engine'),
    Ship: Symbol.for('Ship'),
  }

  interface Engine {
    start(): string;
  }

  interface Ship {
    engage(): string;
  }

  class WarpEngine implements Engine {
    start() {
      return 'warp engine works';
    }
  }

  class Enterprise implements Ship {
    constructor(
      @Inject(TYPES.Engine) private engine: Engine
    ) { }

    engage() {
      return this.engine.start();
    }
  }

  test('should inject dependencies by types', () => {
    const container = new Container()
      .registerType(TYPES.Engine, WarpEngine)
      .registerType(TYPES.Ship, Enterprise);

    expect(container.get(TYPES.Engine) instanceof WarpEngine).toBe(true);
    expect(container.get(TYPES.Ship) instanceof Enterprise).toBe(true);
    expect(container.get<Ship>(TYPES.Ship).engage()).toBe('warp engine works')
  });

  test('should inject values', () => {
    const ValueType = Symbol.for('ValueType');
    const ObjectType = Symbol.for('ObjectType');
    class A {
      constructor(
        @Inject(ValueType) readonly value: number,
        @Inject(ObjectType) readonly object: object,
      ) { };
    }

    const container = new Container()
      .registerType(ValueType, 1)
      .registerType(ObjectType, { some: 'object' })

    expect(container.get(ValueType)).toBe(1);
    expect(container.get(ObjectType)).toEqual({ some: 'object' });
    expect(container.get(A).value).toBe(1);
    expect(container.get(A).object).toEqual({ some: 'object' });
  });

  test('should throw error in case no provider for type', () => {
    const ValueType = Symbol.for('ValueType');

    class A {
      constructor(
        @Inject(ValueType) readonly value: number,
      ) { };
    }

    const container = new Container();

    expect(() => container.get(A)).toThrowError('No provider for ValueType');
    expect(() => container.get(ValueType)).toThrowError('No provider for ValueType');
  });

  test('should add class to container', () => {
    class A {
      value: 'defined'
    }

    @Injectable()
    class B {
      constructor(
        @Inject(A) readonly a: A
      ) { }
    }

    const container = new Container()

    expect(container.get(B) instanceof B).toBe(true);
    expect(container.get(A) instanceof A).toBe(true);
  });

  test('should add class to container', () => {
    class A {
      value: 'defined'
    }

    class B {
      constructor(
        @Inject(A) readonly a: A
      ) { }
    }

    const container = new Container()

    expect(container.get(B) instanceof B).toBe(true);
    expect(container.get(A) instanceof A).toBe(true);
  });
});

