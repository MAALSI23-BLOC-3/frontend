import { ShopOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Tooltip, Button } from "antd";
import { Header } from "antd/es/layout/layout";
import { NavLink } from "react-router";
import { useCart } from "../providers/cartProvider";

interface HeaderProps {
  children?: React.ReactNode;
}
const SiteHeader: React.FC<HeaderProps> = ({ children }) => {
  const { cart } = useCart();
  return (
    <div>
      <Header className="site-header">
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
              <div className="cartButtonWrapper">
                <Button
                  title="Panier"
                  shape="circle"
                  type="default"
                  size="large"
                  icon={<ShoppingCartOutlined />}

                  //   onClick={() => Navigate({ to: "/products" })}
                />
                <span className="cartCount">
                  {cart?.items.reduce(
                    (intial, current) => intial + current.quantity,
                    0
                  )}
                </span>
              </div>
            </Tooltip>
          </NavLink>
        </div>
      </Header>
      {children}
    </div>
  );
};

export default SiteHeader;
