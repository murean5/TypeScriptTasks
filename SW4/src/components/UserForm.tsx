import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import useFormValidation from './hooks/useFormValidation';

// интерфейс для значений формы
interface FormValues {
    name: string;
    email: string;
    password: string;
}

const UserForm: React.FC = () => {
    // состояние для значений формы
    const [values, setValues] = useState<FormValues>({ name: '', email: '', password: '' });
    // состояние для проверки валидности формы
    const [isFormValid, setIsFormValid] = useState(false);

    // рефы для полей ввода
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    // валидация формы
    const validation = useFormValidation(values);

    // эффект для обновления состояния валидности формы
    useEffect(() => {
        setIsFormValid(Object.values(validation).every((v) => v === true));
    }, [validation]);

    // обработчик изменения значений полей ввода
    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({ ...prevValues, [name]: value }));
    }, []);

    // обработчик отправки формы
    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isFormValid) {
            alert('Форма успешно отправлена');
        } else {
            // Фокус на первое невалидное поле
            if (!validation.name && nameRef.current) nameRef.current.focus();
            else if (!validation.email && emailRef.current) emailRef.current.focus();
            else if (!validation.password && passwordRef.current) passwordRef.current.focus();
        }
    }, [isFormValid, validation]);

    // сообщения об ошибках
    const errorMessages = useMemo(() => ({
        name: validation.name === false ? 'Имя должно содержать хотя бы 3 символа' : '',
        email: validation.email === false ? 'Введите правильный email' : '',
        password: validation.password === false ? 'Пароль должен быть не менее 6 символов' : '',
    }), [validation]);

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    ref={nameRef}
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    placeholder="Имя"
                    required
                />
                {errorMessages.name && <span>{errorMessages.name}</span>}
            </div>

            <div>
                <input
                    ref={emailRef}
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                {errorMessages.email && <span>{errorMessages.email}</span>}
            </div>

            <div>
                <input
                    ref={passwordRef}
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    placeholder="Пароль"
                    required
                />
                {errorMessages.password && <span>{errorMessages.password}</span>}
            </div>

            <button type="submit" disabled={!isFormValid}>
                Отправить
            </button>
        </form>
    );
}

export default UserForm;