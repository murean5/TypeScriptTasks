import React from 'react';
import { Task } from './types';

// Определение пропсов для компонента TaskList
interface TaskListProps {
  tasks: Task[];
  deleteTask: (id: number) => void;
  toggleComplete: (id: number) => void;
}

// Компонент TaskList
const TaskList: React.FC<TaskListProps> = ({ tasks, deleteTask, toggleComplete }) => {
  return (
      <ul className="task-list">
        {tasks.map((task) => (
            <li key={task.key} className={task.completed ? 'completed' : ''}>
              <span>{task.name}</span>
              <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.key)} // Переключение завершения задачи
              />
              <button onClick={() => deleteTask(task.key)}>Удалить</button>
            </li>
        ))}
      </ul>
  );
};

export default TaskList;