import { useState } from 'react';
import { axiosRequest } from '../api/axios';
import { useMutation } from '@tanstack/react-query';

type Todo = {
  todoId: string;
  userId: string;
  todoNote: string;
  todoDate: Date;
  todoIsDone: boolean;
  todoPosition: number;
};

type CreateTodoRequestProps = {
  userId: string;
  todoNote: string;
  todoDate: Date;
  todoPosition: number;
};

type DeleteTodoRequestProps = {
  userId: string;
  todoId: string;
};

type EditTodoRequestProps = {
  userId: string;
  todoId: string;
  todoNote: string;
  todoIsDone: boolean;
};

type ChangeTodoPositionRequestProps = {
  userId: string;
  todoId: string;
  todoPosition: number;
  oldPosition: number;
};

type GetDateTodosRequestProps = {
  userId: string;
  todoDate: Date;
};

type UseTodoReturnType = {
  todos: Todo[];
  createTodo: ({ userId, todoNote, todoDate, todoPosition }: CreateTodoRequestProps) => void;
  deleteTodo: ({ userId, todoId }: DeleteTodoRequestProps) => void;
  editTodo: ({ userId, todoId, todoIsDone, todoNote }: EditTodoRequestProps) => void;
  changeTodoPosition: ({ userId, todoId, todoPosition, oldPosition }: ChangeTodoPositionRequestProps) => void;
  getDateTodos: ({ userId, todoDate }: GetDateTodosRequestProps) => void;
};

export const useTodo = (): UseTodoReturnType => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const { mutate: mutateCreateTodo } = useMutation({
    mutationFn: ({ userId, todoNote, todoDate, todoPosition }: CreateTodoRequestProps) =>
      createTodoRequest({ userId, todoNote, todoDate, todoPosition }),
    onSuccess: (data) => {
      setTodos((prev) =>
        [
          ...prev.filter((todo) => todo.todoPosition < data.todoPosition),
          data,
          ...prev
            .filter((todo) => todo.todoPosition >= data.todoPosition)
            .map((item) => {
              return { ...item, todoPosition: item.todoPosition + 1 };
            }),
        ].sort((first, second) => first.todoPosition - second.todoPosition)
      );
    },
    throwOnError: false,
  });

  const { mutate: mutateDeleteTodo } = useMutation({
    mutationFn: ({ userId, todoId }: DeleteTodoRequestProps) => deleteTodoRequest({ userId, todoId }),
    onSuccess: (data) => {
      setTodos((prev) =>
        [
          ...prev.filter((todo) => todo.todoPosition < data.todoPosition),
          ...prev
            .filter((todo) => todo.todoPosition >= data.todoPosition)
            .map((item) => {
              return { ...item, todoPosition: item.todoPosition - 1 };
            }),
        ].sort((first, second) => first.todoPosition - second.todoPosition)
      );
    },
    throwOnError: false,
  });

  const { mutate: mutateEditTodo } = useMutation({
    mutationFn: ({ userId, todoId, todoIsDone, todoNote }: EditTodoRequestProps) =>
      editTodoRequest({ userId, todoId, todoIsDone, todoNote }),
    onSuccess: (data) => {
      setTodos((prev) => [...prev, data].sort((first, second) => first.todoPosition - second.todoPosition));
    },
    throwOnError: false,
  });

  const { mutate: mutateChangeTodoPosition } = useMutation({
    mutationFn: ({ userId, todoId, todoPosition, oldPosition }: ChangeTodoPositionRequestProps) =>
      changeTodoPositionRequest({ userId, todoId, todoPosition, oldPosition }),
    onSuccess: ({ response: data, oldPosition }) => {
      setTodos((prev) =>
        [
          ...prev.filter((todo) => todo.todoPosition < data.todoPosition),
          data,
          ...prev
            .filter((todo) =>
              oldPosition < data.todoPosition
                ? todo.todoPosition >= oldPosition && todo.todoPosition <= data.todoPosition
                : todo.todoPosition <= oldPosition && todo.todoPosition >= data.todoPosition
            )
            .map((item) => {
              return { ...item, todoPosition: oldPosition < data.todoPosition ? item.todoPosition - 1 : item.todoPosition + 1 };
            }),
        ].sort((first, second) => first.todoPosition - second.todoPosition)
      );
    },
    throwOnError: false,
  });

  const { mutate: mutateGetDateTodos } = useMutation({
    mutationFn: ({ userId, todoDate }: GetDateTodosRequestProps) => getDateTodosRequest({ userId, todoDate }),
    onSuccess: (data) => {
      setTodos(data);
    },
    throwOnError: false,
  });

  const createTodo = ({ userId, todoNote, todoDate, todoPosition }: CreateTodoRequestProps) => {
    mutateCreateTodo({ userId, todoNote, todoDate, todoPosition });
  };

  const deleteTodo = ({ userId, todoId }: DeleteTodoRequestProps) => {
    mutateDeleteTodo({ userId, todoId });
  };

  const editTodo = ({ userId, todoId, todoIsDone, todoNote }: EditTodoRequestProps) => {
    mutateEditTodo({ userId, todoId, todoIsDone, todoNote });
  };

  const changeTodoPosition = ({ userId, todoId, todoPosition, oldPosition }: ChangeTodoPositionRequestProps) => {
    mutateChangeTodoPosition({ userId, todoId, todoPosition, oldPosition });
  };

  const getDateTodos = ({ userId, todoDate }: GetDateTodosRequestProps) => {
    mutateGetDateTodos({ userId, todoDate });
  };

  return { todos, createTodo, deleteTodo, editTodo, changeTodoPosition, getDateTodos };
};

const createTodoRequest = async ({ userId, todoNote, todoDate, todoPosition }: CreateTodoRequestProps) => {
  const response = await axiosRequest<Todo>({
    method: 'post',
    url: `/todos/`,
    data: { userId, todoNote, todoDate, todoPosition },
  });

  return response;
};

const deleteTodoRequest = async ({ userId, todoId }: DeleteTodoRequestProps) => {
  const response = await axiosRequest<Todo>({
    method: 'delete',
    url: `/todos/`,
    data: { userId, todoId },
  });

  return response;
};

const editTodoRequest = async ({ userId, todoId, todoNote, todoIsDone }: EditTodoRequestProps) => {
  const response = await axiosRequest<Todo>({
    method: 'patch',
    url: `/todos/`,
    data: { userId, todoId, todoNote, todoIsDone },
  });

  return response;
};

const changeTodoPositionRequest = async ({ userId, todoId, todoPosition, oldPosition }: ChangeTodoPositionRequestProps) => {
  const response = await axiosRequest<Todo>({
    method: 'post',
    url: `/todos/move`,
    data: { userId, todoId, todoPosition },
  });

  return { response, oldPosition };
};

const getDateTodosRequest = async ({ userId, todoDate }: GetDateTodosRequestProps) => {
  const response = await axiosRequest<Todo[]>({
    method: 'post',
    url: `/todos/date`,
    data: { userId, todoDate },
  });

  return response;
};
