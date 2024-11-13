import { useState, useEffect } from 'react';

// интерфейс для значений формы
interface FormValues {
    name: string;
    email: string;
    password: string;
}

// интерфейс для результата валидации
interface ValidationResult {
    name: boolean | null;
    email: boolean | null;
    password: boolean | null;
}

// хук для валидации формы
function useFormValidation(values: FormValues): ValidationResult {
    // состояние для результата валидации
    const [validation, setValidation] = useState<ValidationResult>({
        name: null,
        email: null,
        password: null,
    });

    // эффект для обновления результата валидации при изменении значений формы
    useEffect(() => {
        setValidation({
            name: values.name ? values.name.length >= 3 : null,
            email: values.email ? /^[A-Z0-9._%+-]+@[A-Z0-9-]+\.([A-Z]{2,4})$/i.test(values.email) : null,
            password: values.password ? values.password.length >= 6 : null,
        });
    }, [values]);

    return validation;
}

export default useFormValidation;