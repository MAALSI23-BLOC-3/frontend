import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  Card,
  Row,
  Col,
  Typography,
  Divider,
} from "antd";
import { CreditCardOutlined, BankOutlined } from "@ant-design/icons";
import { useCart } from "../providers/CartProvider";
import productService from "../service/productService";
import { Product } from "../types/Product";
import { CartItemWithInfo } from "./Cart";
import { NavLink } from "react-router";
const { Title, Text } = Typography;

interface PaymentPageProps {}

const PaymentPage: React.FC<PaymentPageProps> = ({}) => {
  const [form] = Form.useForm();
  const [paymentMethod, setPaymentMethod] = React.useState("creditCard");
  const { cart, emptyCart } = useCart();
  const [cartItems, setCartItems] = useState<CartItemWithInfo[]>([]);
  const [paying, setPaying] = useState(false);
  const [payed, setPayed] = useState(false);

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
    }
  };

  const onFinish = () => {
    //Mockup payment
    try {
      setPaying(true);
      setTimeout(() => {
        setPaying(false);
        setPayed(true);
        emptyCart();
      }, 2000);
    } catch (error) {
      console.error("Payment failed", error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px" }}>
      {paying && <div>Paiement en cours... </div>}{" "}
      {payed && (
        <div>
          <p>Paiement effectué</p>
          <p>Votre commande est en route</p>
          <NavLink to="/">
            <Button type="primary" size="large">
              Retour a l'accueil
            </Button>
          </NavLink>
        </div>
      )}
      {!payed && !paying && (
        <>
          <Title level={2}>Informations de paiment</Title>
          <Row gutter={24}>
            <Col xs={24} md={16}>
              <Card bordered={false}>
                <Radio.Group
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  style={{ width: "100%", marginBottom: "24px" }}
                >
                  <Row gutter={16}>
                    <Col span={12}>
                      <Radio.Button
                        value="creditCard"
                        style={{ width: "100%", textAlign: "center" }}
                      >
                        <CreditCardOutlined /> Carte bancaire
                      </Radio.Button>
                    </Col>
                    <Col span={12}>
                      <Radio.Button
                        value="paypal"
                        style={{ width: "100%", textAlign: "center" }}
                      >
                        <BankOutlined /> PayPal
                      </Radio.Button>
                    </Col>
                  </Row>
                </Radio.Group>

                {paymentMethod === "creditCard" && (
                  <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item
                      name="cardNumber"
                      label="Numero de carte"
                      rules={[
                        {
                          required: true,
                          message: "",
                        },
                        { pattern: /^\d{16}$/, message: "Numero invalide" },
                      ]}
                    >
                      <Input
                        placeholder="1234 5678 9012 3456"
                        maxLength={16}
                        style={{ width: "100%" }}
                      />
                    </Form.Item>

                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                          name="expiry"
                          label="Date d'expiration"
                          rules={[
                            {
                              required: true,
                              message: "",
                            },
                          ]}
                        >
                          <Input placeholder="MM/YY" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name="cvc"
                          label="CVC"
                          rules={[
                            { required: true, message: "Please input CVC" },
                            { pattern: /^\d{3,4}$/, message: "CVC invalid" },
                          ]}
                        >
                          <Input placeholder="123" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Form.Item
                      name="cardHolder"
                      label="Nom du titulaire"
                      rules={[{ required: true, message: "" }]}
                    >
                      <Input placeholder="John Doe" />
                    </Form.Item>
                  </Form>
                )}

                {paymentMethod === "paypal" && (
                  <div style={{ textAlign: "center", padding: "40px 0" }}>
                    <Button type="primary" size="large">
                      Continuer avec Paypal
                    </Button>
                  </div>
                )}
              </Card>
            </Col>

            <Col xs={24} md={8}>
              <Card title="Récapitulatif de la commande" bordered={false}>
                {cartItems.map((item) => (
                  <div key={item.productId} style={{ marginBottom: "12px" }}>
                    <Row justify="space-between">
                      <Text>
                        {item.product.name} (x{item.quantity})
                      </Text>
                      <Text>
                        {(item.product.price * item.quantity).toFixed(2)}€
                      </Text>
                    </Row>
                  </div>
                ))}

                <Divider />

                <Row justify="space-between">
                  <Text strong>Total:</Text>
                  <Text strong>{calculateTotal().toFixed(2)}€</Text>
                </Row>

                <Button
                  type="primary"
                  size="large"
                  block
                  style={{ marginTop: "24px" }}
                  onClick={() => form.submit()}
                >
                  Payer {calculateTotal().toFixed(2)} €
                </Button>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default PaymentPage;
