export type MyPick<T, K extends keyof T> = {
    [key in K]: T[key];
};

export type NOfArray<ArrayObj extends unknown[], N extends number> = ArrayObj[N];

export type Unshift<ArrayType, Element> = [Element, ...ArrayType[]];

export type MyExclude<T, U> = T extends U
    ? never
    : T;


// Проверка функционала

// [MyPick]
type City = {
    name: string;
    area: number;
    population: number;
};
const pickedCity: MyPick<City, 'area' | 'population'> = {
    area: 700,
    population: 2000,
};
console.log(pickedCity);

// [NOfArray]
const item: NOfArray<['s', 1, true], 0> = 's';
console.log(item);

// [Unshift]
const unshift: Unshift<string, number> = [1, 's', 'ss'];
console.log(unshift);

// [MyExclude]
type A = 1 | 2 | "x";
type B = 2;
const exluded1: MyExclude<A, B> = "x";
const exluded2: MyExclude<A, B> = 1;
console.log(exluded1, exluded2);