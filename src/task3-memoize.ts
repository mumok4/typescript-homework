/*
Задание 3: Реализуйте memoize для функций

Ограничения:
- Аргументы функции — только строки или числа (для упрощения)
- Кэшируйте результат по аргументам
*/

type Primitive = string | number;
type PrimitiveFn = (...args: Primitive[]) => Primitive;

function memoize(fn: PrimitiveFn): PrimitiveFn {
  // TODO: реализуйте

  const cache = new Map<string,Primitive>();
  return function (this: Primitive, ...args: Primitive[]): Primitive {
    const key = JSON.stringify(args)

    if (cache.has(key)) {
      console.log(`Cached ${cache.get(key)}`);
      return cache.get(key) as Primitive;
    }

    const value = fn.call(this, ...args);
    cache.set(key, value);
    return value;
  }
}

const slowAdd = (a: Primitive, b: Primitive): Primitive => {
  if (typeof a === 'number' && typeof b === 'number') return a + b;
  return `${a}${b}`;
};

const memoAdd = memoize(slowAdd);

console.log(memoAdd('a', 'b')); // возвращает ab
console.log(memoAdd(1, 2)); // возвращает 3

memoAdd(1, 2); // из кэша, возвращает 3
