import { BrowserRouter } from "react-router";
import "./App.css";
import { AuthProvider } from "./providers/authProvider";
import { ConfigProvider, theme } from "antd";
import AppRoutes from "./app/Routes";
import { CartProvider } from "./providers/CartProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ConfigProvider
            theme={{
              algorithm: [theme.defaultAlgorithm],
            }}
          >
            <AppRoutes />
          </ConfigProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
