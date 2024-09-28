import { useEffect } from 'react';
import { useTodoStore } from '../state/todoSlice';

export const useTodos = () => {
  const { todos, loadTodos, addTodo, removeTodo, toggleTodo } = useTodoStore();

  useEffect(() => {
    const fetchTodos = async () => {
      await loadTodos();
    };

    fetchTodos();
  }, [loadTodos]);

  return {
    todos,
    addTodo,
    removeTodo,
    toggleTodo,
  };
};
