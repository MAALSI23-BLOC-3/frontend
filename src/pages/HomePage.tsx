import React from "react";
import { Button, Layout, Tooltip, Typography } from "antd";
import { ShopOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Navigate, NavLink } from "react-router";

const { Header, Content, Footer } = Layout;

const { Title } = Typography;

const HomePage: React.FC = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "80vh" }}>
      <Layout
        style={{
          //   height: "100dvh",
          width: "100vw",
          backgroundColor: "#f0f2f5",
          flexGrow: 1,
        }}
      >
        <Content
          style={{
            overflow: "initial",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            //   paddingTop: "10%",
          }}
        >
          <div
            style={{
              //   padding: 24,
              textAlign: "center",
              width: "50%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "50px 0",
            }}
          >
            <div>
              <Title level={2} style={{ color: "#cb5353" }}>
                Breizhsport
              </Title>
              <Title style={{ color: "#285b72" }} level={1}>
                Prêt à repousser vos limites ? Découvrez notre sélection
                d'équipements de sport haut de gamme, conçus pour vous
                accompagner dans chaque victoire.
              </Title>
            </div>
            <div>
              <NavLink to="/products">
                <Button
                  type="default"
                  size="large"
                  icon={<ShopOutlined />}
                  iconPosition="end"
                  // onClick={() => Navigate({ to: "/cart" })}
                >
                  Voir les produits
                </Button>
              </NavLink>
            </div>
          </div>
          <div style={{ width: "50%", textAlign: "center" }}>
            <img
              src="/images/bike.jpg"
              alt="Home"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </Content>
      </Layout>
    </div>
  );
};

export default HomePage;
