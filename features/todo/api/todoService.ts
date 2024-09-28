import { Todo } from '@/entities';
import { getCsrfToken, useSession } from 'next-auth/react';

const API_URL = '/api/todos';

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }
  return response.json();
};

export const addTodo = async (title: string, accessToken: string): Promise<Todo> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title }),
  });

  console.log(response);

  if (!response.ok) {
    throw new Error('Failed to add todo');
  }

  return response.json();
};


export const toggleComplete = async (id: number, completed: boolean): Promise<Todo> => {
    const response = await fetch(API_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, completed }),
    });

    console.log(response);

    if (!response.ok) {
      throw new Error('Failed to add todo');
    }

    return response.json();
  };

export const deleteTodo = async (id: number): Promise<void> => {
  const response = await fetch(API_URL, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    throw new Error('Failed to delete todo');
  }
};
