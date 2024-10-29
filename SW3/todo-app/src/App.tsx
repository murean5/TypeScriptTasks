// `todo-app/src/App.tsx`
import React, { Component } from 'react';
import TaskList from './TaskList';
import TaskInput from './TaskInput';
import { Task } from './types';
import './App.css';

// Определение интерфейса состояния для компонента App
interface AppState {
  tasks: Task[];
  currentTask: string | null;
  previousTask: string | null;
}

// Компонент App
export default class App extends Component<{}, AppState> {
  state: AppState = {
    tasks: [],
    currentTask: null,
    previousTask: null,
  };

  // Функция для добавления задачи
  addTask = (name: string) => {
    this.setState((prevState) => ({
      tasks: [...prevState.tasks, { key: Date.now(), name, completed: false }],
      previousTask: prevState.currentTask,
      currentTask: name,
    }));
  };

  // Функция для удаления задачи
  deleteTask = (key: number) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => task.key !== key),
    }));
  };

  // Функция для переключения завершения задачи
  toggleComplete = (key: number) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) =>
          task.key === key ? { ...task, completed: !task.completed } : task
      ),
    }));
  };

  render() {
    const { tasks, currentTask, previousTask } = this.state;

    return (
        <div className="app">
          <h1>TO-DO LIST</h1>
          <TaskInput addTask={this.addTask} />
          <TaskList
              tasks={tasks}
              deleteTask={this.deleteTask}
              toggleComplete={this.toggleComplete}
          />
          <div className="task-history">
            <p>Текущая задача: {currentTask}</p>
            <p>Предыдущая задача: {previousTask}</p>
          </div>
        </div>
    );
  }
}