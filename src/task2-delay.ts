/*
Задание 2: Реализуйте delay

Требования:
- delay(ms) возвращает промис
- Промис резолвится через ms миллисекунд
*/

function delay(ms: number): Promise<void> {
  // TODO: реализуйте
  return new Promise<void>(resolve => setTimeout(resolve, ms));
}

delay(500).then(() => console.log("Готово через 500мс")); // Должно завершиться

delay(-2).then(() => console.log("Завершено")) // Работа, как с 0
  .catch(err => console.log(err));