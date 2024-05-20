import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { setTodos } from '../features/todos/todoSlice';
import api from '../api';

const fetchTodos = async () => {
    const { data } = await api.get('/todos');
    return data;
};

const Abouit = () => {
    const dispatch = useDispatch();

    const todos = useSelector((state) => state.todos.todos);
    const queryClient = useQueryClient();

    const { status, isFetching, isLoading } = useQuery('todos', fetchTodos, {
        onSuccess: (data) => {
            dispatch(setTodos(data));
        },
        refetchOnWindowFocus: false,
        staleTime: 300000,
        cacheTime: 24 * 3600000,
        refetchInterval: 300000,
    });


    const handleDelete = async (id) => {
        await api.delete(`/todos/${id}`);
        queryClient.invalidateQueries('todos', { force: true })
    };


    return (
        todos.map((todo) => (
            <li key={todo.id}>
                <span
                    style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                >
                    {todo.title}
                </span>
                <button onClick={() => handleDelete(todo.id)}>Delete</button>
            </li>
        ))
    )
}

export default Abouit