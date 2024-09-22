// Определяем интерфейс для данных формы
interface TemplateFormData {
    username: string;
    email: string;
    age: number;
}

// Определяем тип для правил валидации
type ValidationRules<T> = {
    [K in keyof T]: (value: T[K]) => string | null;
};

// Функция валидации формы
function validateForm(formData: TemplateFormData, validationRules: ValidationRules<TemplateFormData>) {
    const errors: Partial<Record<keyof FormData, string>> = {};
    
    // Проходим по всем полям формы
    (Object.keys(formData) as (keyof FormData)[]).forEach((field) => {
        const rule = validationRules[field];
        
        if (rule) {
            const errorMessage = rule(formData[field]);
            if (errorMessage) {
                errors[field] = errorMessage;
            }
        }
    });
    
    return errors;
}

// Правила валидации для полей формы
const validationRules: ValidationRules<TemplateFormData> = {
    username: (value) => !value ? `Поле 'username' не может быть пустым!` : null,
    email: (value) => !value ? `Поле 'email' не может быть пустым!` : null,
    age: (value) => value <= 0 ? `Поле 'age' должно быть больше нуля!` : null,
};


const template2: TemplateFormData = {
    username: "",
    email: "test@example.com",
    age: 0
};

console.log(validateForm(template2, validationRules));
