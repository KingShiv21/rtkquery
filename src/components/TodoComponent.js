// src/components/TodoComponent.js
import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { setTodos } from '../features/todos/todoSlice';
import api from '../api';

const fetchTodos = async () => {
  try {
    const { data } = await api.get('/todos');
    return data;
  } catch (error) {
    return error
  }
};

const TodoComponent = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos) || [];
  const [newTodo, setNewTodo] = useState('');

  const {  isFetching, isLoading , error} = useQuery('todos', fetchTodos, {
    onSuccess: (data) => {
      dispatch(setTodos(data));
    },
    refetchOnWindowFocus: false,
    staleTime: 300000, // 5 minutes  // agr rerender ho to itne time tk to call nhi krni , ye automatic pe nhi hota
    cacheTime: 24 * 3600000, // 1 day // cache me kb tk bhi ho pr refetch to hoga
    refetchInterval: 300000, // 5 minutes // itne time me to refetch hoga hi
  });
  // so , even if stale time is over and data is not considered fresh , it don't automatically hit apis after it
  // even if cache time is longer then interval , then also it recalls apis from server
  // console.log("isloading", isLoading, " : ", "isfetching", isFetching);


  const handleAddTodo = async () => {

    try {
      await api.post('/todos', { title: newTodo, completed: false });
    } catch (error) {
      console.log(error);
    }
    queryClient.invalidateQueries('todos');
    setNewTodo('');
  };

  const handleToggleComplete = async (todo) => {
    await api.put(`/todos/${todo.id}`, { ...todo, completed: !todo.completed });
    queryClient.invalidateQueries('todos');
  };

  const handleDelete = async (id) => {
    await api.delete(`/todos/${id}`);
    queryClient.invalidateQueries('todos');
  };

  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading todos</div>;
  }

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>


        { isFetching ? <div>...fetching</div> : todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              onClick={() => handleToggleComplete(todo)}
            >
              {todo.title}
            </span>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoComponent;
