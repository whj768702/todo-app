import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "@ant-design/v5-patch-for-react-19";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <ConfigProvider locale={zhCN}>
      <StrictMode>
        <App />
      </StrictMode>
    </ConfigProvider>,
  );
} else {
  console.error("Root element not found");
}
