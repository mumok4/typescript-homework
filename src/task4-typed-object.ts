/*
Задание 4: Реализуйте typedObject

Цель:
- Создать объект на основе схемы ожидаемых типов
- При присваивании проверять тип и бросать ошибку при несоответствии
*/
type Primitive = string | number;

function typedObject(schema: Record<string, string>): Record<string, Primitive> {
  // TODO: реализуйте

  return new Proxy({} as Record<string, Primitive>, {
    set(target, key: string, value: Primitive, receiver: object): boolean {
      if (!(key in schema)) {
        throw new Error(`Unknown key: ${key}`);
      }

      if (typeof value !== schema[key]) {
        throw new Error(`Cannot set ${typeof value} for ${key}`);
      }

      return Reflect.set(target, key, value);
    }
  })
}

const user = typedObject({
  name: "string",
  age: "number",
});

user.name = "Ivan"; // выполнится
user.age = 20;      // выполнится

try{
  user.age = "20";
} catch(err) {
  console.log((err as Error).message);
} // Ошибка о неправильном типе

try{
  user.gender = "Male";
} catch(err) {
  console.log((err as Error).message);
} // Ошибка об отсутствии ключа

