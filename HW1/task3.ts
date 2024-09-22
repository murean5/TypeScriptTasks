function processValue(value: string | number | boolean): string | number | boolean {
    if (typeof value === 'string') {
        // Если значение строка, возвращаем её в верхнем регистре
        return value.toUpperCase();
    } else if (typeof value === 'number') {
        // Если значение число, возвращаем его квадрат
        return value * value;
    } else if (typeof value === 'boolean') {
        // Если значение булево, возвращаем его противоположное значение
        return !value;
    }
}

console.log(processValue("text"));   // "TEXT"
console.log(processValue(5));        // 25
console.log(processValue(true));     // false
