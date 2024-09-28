import React, { useState } from 'react';
import { Button } from '@/shared/components';
import { useSession } from 'next-auth/react';
import { useTodoStore } from '../state/todoSlice';

export const AddTodo: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const { addTodo } = useTodoStore();
  const session = useSession();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.trim()) {
      addTodo(inputValue, session.data?.accessToken!);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="border p-2 flex-grow"
        placeholder="Add a new task"
      />
      <Button className="bg-blue-500 text-white p-2 ml-2">
        Add
      </Button>
    </form>
  );
};
