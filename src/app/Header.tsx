import { ShopOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Tooltip, Button } from "antd";
import { Header } from "antd/es/layout/layout";
import { NavLink } from "react-router";

interface HeaderProps {
  children?: React.ReactNode;
}
const SiteHeader: React.FC<HeaderProps> = ({ children }) => {
  return (
    <div>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#f0f2f5",
        }}
      >
        <NavLink to="/">
          <img src="/images/logo.png" alt="" className="logo" />
        </NavLink>

        <div className="homeButtonGroup">
          <NavLink to="/products">
            <Tooltip title="Produits">
              <Button
                shape="circle"
                type="default"
                size="large"
                icon={<ShopOutlined />}
                // onClick={() => Navigate({ to: "/cart" })}
              />
            </Tooltip>
          </NavLink>
          <NavLink to="/cart">
            <Tooltip title="Panier">
              <Button
                title="Panier"
                shape="circle"
                type="default"
                size="large"
                icon={<ShoppingCartOutlined />}
                //   onClick={() => Navigate({ to: "/products" })}
              />
            </Tooltip>
          </NavLink>
        </div>
      </Header>
      {children}
    </div>
  );
};

export default SiteHeader;
