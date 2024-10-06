export type DeepPartial<T> = {
    [key in keyof T]?: T[key] extends object
    ? DeepPartial<T[key]>
    : T[key];
};

export type MyCapitalize<T extends string> = T extends `${infer A}${infer B}`
    ? `${Uppercase<A>}${B}`
    : T;

export type DeepMutable<T> = {
    -readonly [key in keyof T]: T[key] extends object
    ? DeepMutable<T[key]>
    : T[key];
};

export type ParseURLParams<StringElem extends string> = StringElem extends
    `${infer _}:${infer Param}/${infer Other}`
    ? Param | ParseURLParams<`/${Other}`>
    : StringElem extends `${infer _}:${infer Param}`
    ? Param
    : never;


// Проверка функционала

// [DeepPartial]
type City = {
    name: string;
    area: number;
    population: number;

    location: {
        country: string;
    };
};
const city: DeepPartial<City> = {
    area: 700,
    location: {
        country: "Russia"
    }
}
console.log(city)

// [MyCapitalize]
const example: MyCapitalize<"example"> = "Example";
console.log(example)

// [DeepMutable]
interface ReadonlyData {
    readonly key1: boolean;
    readonly key2: {
        readonly key2_1: number;
    };
}
const mutableData: DeepMutable<ReadonlyData> = {
    key1: true,
    key2: {
        key2_1: 1,
    }
};
mutableData.key1 = false;
console.log(mutableData);

// [ParseURLParams]
const param1: ParseURLParams<'posts/:id/:user'> = 'id';
const param2: ParseURLParams<'posts/:id/:user'> = 'user';
console.log(param1, param2);