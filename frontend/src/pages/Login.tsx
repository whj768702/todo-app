import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";

import api, { setToken } from "../api";

export default function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const handleSubmit = async () => {
    const { email, password } = form.getFieldsValue();
    const res = await api.post("/login", { email, password });
    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
    navigate("/todos");
  };

  const handleRegister = async () => {
    const { email, password } = form.getFieldsValue();
    const res = await api.post("/register", { email, password });
    if (res.status === 200) {
      message.info("Register successfully");
    }
    console.log("handle register: ", res);
  };

  console.log('here is login page');

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Form
        form={form}
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
        <Button type="primary" onClick={handleSubmit}>
          Login
        </Button>
        <Button type="link" onClick={handleRegister}>
          Register
        </Button>
      </Form>
    </div>
  );
}
