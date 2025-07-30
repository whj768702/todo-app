import { Button, Input, Space } from "antd";
import { useEffect, useState } from "react";
import api from "../api";

interface Todo {
  id: string;
  title: string;
  content?: string;
  done: boolean;
}

export default function Todos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTile] = useState("");

  const fetchTodos = async () => {
    const res = await api.get("/todos");
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!title.trim()) {
      return;
    }
    await api.post("/todos", { title });
    setTile("");
    fetchTodos();
  };

  const toggleDone = async (id: string, done: boolean) => {
    await api.patch(`/todos/${id}`, { done: !done });
    fetchTodos();
  };

  const deleteTodo = async (id: string) => {
    await api.delete(`/todos/${id}`);
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-4">
      <div className="flex gap-2">
        <Input
          value={title}
          onChange={(e) => setTile(e.target.value)}
          type="text"
          placeholder="New Todo"
        />
        <Button type="primary" onClick={addTodo}>
          Add
        </Button>
      </div>
      <Space direction="vertical" style={{ display: "flex" }}>
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex justify-between items-center p-2 border rounded"
          >
            <span
              className={`cursor-pointer ${todo.done ? "line-through text-gray-400" : ""}`}
              onClick={() => toggleDone(todo.id, todo.done)}
            >
              {todo.title}
            </span>
            <Button onClick={() => deleteTodo(todo.id)} type="text" danger>
              Delete
            </Button>
          </div>
        ))}
      </Space>
    </div>
  );
}
