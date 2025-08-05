import { Button, Input, Modal, message, Popconfirm, Space } from "antd";
import dayjs from "dayjs";
import { SquarePen, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../api";

interface Todo {
  id: string;
  title: string;
  content?: string;
  done: boolean;
  createAt: string;
}

export default function Todos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTile] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [editTodo, setEditTodo] = useState<Todo | null>(null);

  const fetchTodos = async () => {
    const res = await api.get("/todos");
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!title.trim()) {
      message.warning("Please enter a title");
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

  const handleEditTodo = (todo: Todo) => {
    setEditTodo(todo);
    setEditModal(true);
  };

  const updateTodo = async () => {
    await api.patch(`/todos/${editTodo!.id}`, { title: editTodo!.title });
    fetchTodos();
    setEditModal(false);
    setEditTodo(null);
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
            className={`flex justify-between items-center p-2 border rounded ${todo.done ? "border-green-500" : "border-amber-500"}`}
          >
            <span
              className={`cursor-pointer ${todo.done ? "line-through text-gray-400" : ""}`}
              onClick={() => toggleDone(todo.id, todo.done)}
            >
              {todo.title}
            </span>
            <span>{dayjs(todo.createAt).format("YYYY-MM-DD HH:mm:ss")}</span>
            <div className="flex gap-x-2">
              <SquarePen
                size={14}
                onClick={() => handleEditTodo(todo)}
                className={`${todo.done ? "text-gray-300 cursor-not-allowed" : "cursor-pointer"}`}
              />
              <Popconfirm
                title="Are you sure to delete this todo?"
                onConfirm={() => deleteTodo(todo.id)}
                okText="Yes"
                cancelText="No"
              >
                <Trash2
                  size={14}
                  className={`${todo.done ? "text-gray-300 cursor-not-allowed" : "cursor-pointer text-red-500"}`}
                />
              </Popconfirm>
            </div>
          </div>
        ))}
      </Space>
      <Modal
        title="编辑✍️"
        open={editModal}
        onCancel={() => setEditModal(false)}
        onOk={updateTodo}
      >
        <Input
          placeholder="请输入内容"
          value={editTodo?.title}
          onChange={(e) => setEditTodo({ ...editTodo!, title: e.target.value })}
        />
      </Modal>
    </div>
  );
}
