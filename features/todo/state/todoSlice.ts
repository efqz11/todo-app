import { create } from 'zustand';
import { fetchTodos, addTodo as addTodoService, deleteTodo as deleteTodoService, toggleComplete as toggleCompleteService } from '../api/todoService';
import { Todo } from '@/entities';


interface TodoState {
  todos: Todo[];
  loadTodos: () => Promise<void>;
  addTodo: (title: string, accessToken: string) => Promise<void>;
  removeTodo: (id: number) => Promise<void>;
  toggleTodo: (id: number, newState: boolean) => void;
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  loadTodos: async () => {
    const todos = await fetchTodos();
    set({ todos });
  },
  addTodo: async (title: string, accessToken: string) => {
    const newTodo = await addTodoService(title, accessToken);
    set((state) => ({
      todos: [...state.todos, newTodo],
    }));
  },
  removeTodo: async (id: number) => {
    await deleteTodoService(id);
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }));
  },
  toggleTodo: async (id: number, newState: boolean) => {
    await toggleCompleteService(id, newState);
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  },
}));