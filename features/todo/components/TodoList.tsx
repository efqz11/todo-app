import React from 'react';
import { Todo } from '@/entities';
import { TodoItem } from '.';
import { useTodoStore } from '../state/todoSlice';

export const TodoList: React.FC = () => {
  const { todos } = useTodoStore();

  return (
    <ul className="mt-4">
      {todos.length > 0 ? (
        todos.map((todo: Todo) => <TodoItem key={todo.id} todo={todo} />)
      ) : (
        <li className="text-gray-500">No tasks available.</li>
      )}
    </ul>
  );
};
