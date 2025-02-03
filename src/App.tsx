import { BrowserRouter } from "react-router";
import "./App.css";
import { AuthProvider } from "./providers/authProvider";
import { ConfigProvider, theme } from "antd";
import AppRoutes from "./app/Routes";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ConfigProvider
          theme={{
            algorithm: [theme.defaultAlgorithm],
          }}
        >
          <AppRoutes />
        </ConfigProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
