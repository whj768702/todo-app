import { Button, Form, Input } from "antd";
import type React from "react";
import { useNavigate } from "react-router-dom";

import api, { setToken } from "../api";

export default function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = form.getFieldsValue();
    const res = await api.post("/login", { email, password });
    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
    navigate("/todos");
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Form
        form={form}
        onSubmitCapture={handleSubmit}
        labelCol={{ span: 8 }}
        labelAlign="left"
      >
        <Form.Item
          label="Email"
          name={"email"}
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please input a valid email!" },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name={"password"}
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input placeholder="Password" type="password" />
        </Form.Item>
        <Button htmlType="submit" type="primary">
          Login
        </Button>
      </Form>
    </div>
  );
}
