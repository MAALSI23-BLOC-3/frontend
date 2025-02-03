import { Card, Row, Col, Tag, Space, Carousel, Typography, Button } from "antd";
import { Product } from "../types/Product";
import { ShopOutlined } from "@ant-design/icons";

const { Meta } = Card;
const { Text, Title } = Typography;

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card
      hoverable
      className="productCard"
      cover={
        product.images.length > 0 ? (
          <Carousel autoplay>
            {product.images.map((image, index) => (
              <div key={index}>
                <img
                  alt={product.name}
                  src={image}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              </div>
            ))}
          </Carousel>
        ) : null
      }
      style={{ margin: "16px", maxWidth: 400, minWidth: 300 }}
    >
      <Meta
        title={<Title level={4}>{product.name}</Title>}
        description={
          <Typography.Paragraph ellipsis={{ rows: 2 }}>
            {product.description}
          </Typography.Paragraph>
        }
      />

      <Space direction="vertical" style={{ marginTop: 16, width: "100%" }}>
        <Row gutter={[8, 8]}>
          <Col span={12} style={{ overflow: "hidden" }}>
            <Text strong>Prix: </Text>
            <br />
            <Text>
              {Number(product.price).toFixed(2)}
              {product.currency}
            </Text>
          </Col>
          <Col span={12} style={{ overflow: "hidden" }}>
            <Text strong>Marque: </Text>
            <br />
            <Tag title={product.brand} rootClassName="tagCustom" color="blue">
              {product.brand}
            </Tag>
          </Col>
          <Col span={12} style={{ overflow: "hidden" }}>
            <Text strong>Categorie: </Text>
            <br />
            <Tag
              title={product.brand}
              color="geekblue"
              rootClassName="tagCustom"
            >
              {product.category}
            </Tag>
          </Col>
          <Col span={12} style={{ overflow: "hidden" }}>
            <Text strong>Materiel: </Text>
            <br />
            <Text>{product.material}</Text>
          </Col>
          <Col span={12} style={{ overflow: "hidden" }}>
            <Text strong>Couleur: </Text>
            <br />
            <Text style={{ maxWidth: "100%", textOverflow: "ellipsis" }}>
              {product.color}
            </Text>
          </Col>
          <Col span={12} style={{ overflow: "hidden" }}>
            <Text strong>Taille: </Text>
            <br />
            <Text>{product.size}</Text>
          </Col>
        </Row>
      </Space>

      <Button
        type="primary"
        size="large"
        icon={<ShopOutlined />}
        // onClick={() => Navigate({ to: "/cart" })}
      >
        Ajouter au panier
      </Button>
    </Card>
  );
};

export default ProductCard;
