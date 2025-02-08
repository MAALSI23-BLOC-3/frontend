import React, { useEffect, useState } from "react";
import { useCart } from "../providers/cartProvider";
import { CartItem } from "../types/Cart";
import productService from "../service/productService";
import { Product } from "../types/Product";
import ProductList from "../components/ProductList";
import { Button, Flex, Spin, Typography } from "antd";
import { EuroOutlined, ShopOutlined } from "@ant-design/icons";
import { NavLink } from "react-router";
const { Title } = Typography;

export interface CartItemWithInfo extends CartItem {
  product: Product;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItemWithInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const { cart } = useCart();

  useEffect(() => {
    fetchCartItemsInfo();
  }, [cart]);

  const fetchCartItemsInfo = async () => {
    try {
      const itemPromises: Promise<Product>[] = [];
      cart?.items.forEach((item) => {
        itemPromises.push(productService.getById(item.productId));
      });
      const items = await Promise.all(itemPromises);
      const cartItems: CartItemWithInfo[] = items.map((item, index) => {
        return {
          product: item,
          quantity: cart?.items[index].quantity || 0,
          productId: item.id,
        };
      });
      setCartItems(cartItems);
    } catch (error) {
      console.error("Fetch cart items failed", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="cartPage">
      <Title level={1} style={{ color: "#cb5353" }}>
        Mon Panier
      </Title>
      {loading ? (
        <Flex align="center" gap="middle">
          <Spin size="large" />
        </Flex>
      ) : (
        <></>
      )}
      {cartItems.length === 0 ? (
        <>
          <p>Votre panier est vide</p>
          <br />
          <NavLink to="/products">
            <Button type="primary" size="large" icon={<ShopOutlined />}>
              Voir nos produits
            </Button>
          </NavLink>
        </>
      ) : (
        <>
          <ProductList products={cartItems.map((item) => item.product)} />
          <div>
            <h5>Total</h5>
            <p>
              {cartItems.reduce(
                (initial, item) => initial + item.quantity * item.product.price,
                0
              )}
              €
            </p>
            <NavLink to="/payment">
              <Button type="primary" size="large" icon={<EuroOutlined />}>
                Passer au paiment
              </Button>
            </NavLink>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
