[![Travis](https://api.travis-ci.org/vposd/simple-di.svg)](https://travis-ci.org/vposd/simple-di/) [![codecov](https://codecov.io/gh/vposd/simple-di/branch/master/graph/badge.svg)](https://codecov.io/gh/vposd/simple-di)

# Simple DI

A minimalistic and lightweight DI container written in Typescript

## Installation

```
npm i @vposd/simple-di --save
```

## Usage

### Injectable
Class decorator adds class to global registry and add to container by default.
Each container has different class instance.

```typescript
import 'reflect-metadata';
import { Container } from '@vposd/simple-di';

@Injectable()
class Some {
  constructor(
    private dep: Dependency
  ) { }
}

const container = new Container();
const instance = container.get(Some);
```

### Inject
Parameter decorator allows inject interface and other object and non-object values.

```typescript
import 'reflect-metadata';
import { Container } from '@vposd/simple-di';

const Worker = Symbol.for('Worker');

interface Worker {
  run();
}

class Task implements Worker {
  run() { }
}

class App {
  constructor(
    @Inject(Worker) private worker: Worker
  ) { }
}

const container = new Container().registerType(Worker, Task);
const instance = container.get(Worker);
```
