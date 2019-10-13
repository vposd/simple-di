import { Container } from '../src/container';
import { Injectable } from '../src/decorators';

describe('Injectable decorator', () => {

  abstract class Engine {
    start: () => string;
  }

  @Injectable()
  class WarpEngine implements Engine {
    factor = 0;

    start() {
      this.factor++;
      return 'warp factor ' + this.factor;
    }
  }

  @Injectable()
  class Ship {
    constructor(private engine: WarpEngine) { }

    get speed() {
      return this.engine.factor;
    }

    engage() {
      return this.engine.start();
    }
  }

  test('should set dependencies tree for container', () => {
    const container = new Container();
    const engine = container.get(WarpEngine);
    const ship = container.get(Ship);

    expect(engine instanceof WarpEngine).toBe(true);
    expect(ship instanceof Ship).toBe(true);
    expect(ship.engage()).toBe('warp factor 1');
  });

  test('should set dependencies tree for many containers', () => {
    const ship1 = new Container().get(Ship);
    ship1.engage();
    ship1.engage();
    ship1.engage();

    const ship2 = new Container().get(Ship);
    ship2.engage();

    expect(ship1.speed).toBe(3);
    expect(ship2.speed).toBe(1);
  });

  test('should provide singletones', () => {
    let count = 0;

    @Injectable()
    class Singleton {
      constructor() {
        count++;
      }
    }

    const container = new Container();
    container.get(Singleton);
    container.get(Singleton);
    container.get(Singleton);

    expect(count).toBe(1);
  });

  test('should detect circular dependency', () => {

    @Injectable()
    class A {
      constructor(private a: A) { }
    }

    const container = new Container();
    const getCircular = () => container.get(A);

    expect(getCircular).toThrowError('Circular dependency of A');
  });

  test('should provide other deps', () => {

    class ImpulseEngine implements Engine {
      start() {
        return 'impulse engine works';
      }
    }

    const container = new Container()
      .registerType(WarpEngine, ImpulseEngine);

    expect(container.get(WarpEngine) instanceof ImpulseEngine).toBe(true);
    expect(container.get(WarpEngine).start()).toBe('impulse engine works');
  });

  test('should provide specific class', () => {

    class ImpulseEngine implements Engine {
      start() {
        return 'impulse engine works';
      }
    }

    const container = new Container()
      .registerType(WarpEngine, ImpulseEngine);

    expect(container.get(WarpEngine) instanceof ImpulseEngine).toBe(true);
    expect(container.get(Ship).engage()).toBe('impulse engine works');
  });

  test('should work with abstract classes', () => {

    @Injectable()
    class Ship {
      constructor(private engine: Engine) { }

      engage() {
        return this.engine.start();
      }
    }

    class ImpulseEngine implements Engine {
      start() {
        return 'impulse engine works'
      }
    }

    const container = new Container()
      .registerType(Engine, ImpulseEngine);

    expect(container.get(Engine) instanceof ImpulseEngine).toBe(true);
    expect(container.get(Ship).engage()).toBe('impulse engine works');
  });
})

