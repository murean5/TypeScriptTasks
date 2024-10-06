type CamelCase<S extends string> =
    S extends `${infer Left}_${infer Right}`
    ? `${Left}${Capitalize<CamelCase<Right>>}`
    : S;

export type Camelize<ObjectType> = {
    [key in keyof ObjectType as CamelCase<Extract<key, string>>]: ObjectType[key] extends Record<string, any>
    ? Camelize<ObjectType[key]>
    : ObjectType[key]
};

export type DeepPick<T, Paths extends keyof T | keyof any> = Paths extends keyof T
    ? { [key in Paths]: T[key] }
    : Paths extends `${infer Key}.${infer B}`
    ? Key extends keyof T
    ? { [_ in Key]: DeepPick<T[Key], B> }
    : never
    : never;


// Проверка функционала

// [Camelize]
type SnakeCaseObj = {
    first_field: string;
    second_field: {
        inner_field: number;
    };
};
const obj: Camelize<SnakeCaseObj> = {
    firstField: "str",
    secondField: {
        innerField: 1
    }
};
console.log(obj);

// [DeepPick]
interface City {
    info: {
        name: string;
        location: {
            country: string;
            postCode: string;
        };
    };
};

const pickedCity1: DeepPick<City, 'info.location.country' | 'info.name'> = {
    info: {
        location: {
            country: "Russia"
        }
    }
};
const pickedCity2: DeepPick<City, 'info.location.country' | 'info.name'> = {
    info: {
        name: "Moscow"
    }
};
console.log(pickedCity1, '\t', pickedCity2)