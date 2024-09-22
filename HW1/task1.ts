enum genderEnum {
    MALE = 'Мужской',
    FEMALE = 'Женский'
}

interface Person {
    name: string;
    age: number;
    hobbies: string[];
    gender: genderEnum;
}

function personInfo(person: Person) {
    const hobbiesFormatted = person.hobbies.length == 0 ? '[-]' : person.hobbies.join(', ') // проверяем наличие хобби
    return `${person.name}, ${person.age} лет, любит: ${hobbiesFormatted}. Пол: ${person.gender}`;
}

const template1: Person = {
    name: "Денис",
    age: 25,
    hobbies: ["чтение", "спорт"],
    gender: genderEnum.MALE
};

console.log(personInfo(template1))