// `todo-app/src/TaskInput.tsx`
import React, { useRef, useState } from 'react';

// Определение пропсов для компонента TaskInput
interface TaskInputProps {
  addTask: (name: string) => void;
}

// Компонент TaskInput
const TaskInput: React.FC<TaskInputProps> = ({ addTask }) => {
  const [taskName, setTaskName] = useState(''); // Состояние для хранения имени задачи
  const inputRef = useRef<HTMLInputElement>(null); // Ссылка на элемент input

  // Функция для добавления задачи
  const handleAddTask = () => {
    if (taskName.trim()) {
      addTask(taskName); // Вызов функции addTask, переданной через пропсы
      setTaskName(''); // Очистка поля ввода
      inputRef.current?.focus(); // Фокус на поле ввода
    }
  };

  return (
      <div className="task-input">
        <input
            ref={inputRef}
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)} // Обновление состояния имени задачи
            placeholder="Что вы хотите сделать?"
        />
        <button onClick={handleAddTask}>Добавить</button>
      </div>
  );
};

export default TaskInput;