import api from '../api';
export const handleAddTodo = async () => {
    return await api.post('/todos', { title: newTodo, completed: false });
  };

  export const handleToggleComplete = async (todo) => {
    return await api.put(`/todos/${todo.id}`, { ...todo, completed: !todo.completed });
  };

 export const handleDelete = async (id) => {
    return await api.delete(`/todos/${id}`);
  };