import { useState, useEffect } from "react";
import productsService from "../service/productService";
import { Product } from "../types/Product";
import ProductList from "../components/ProductList";
import { Flex, Spin, Typography } from "antd";
const { Title } = Typography;

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await productsService.getAll();
      setProducts(data);
    } catch (error) {
      console.error("Fetch products failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {loading ? (
        <Flex align="center" gap="middle">
          <Spin size="large" />
        </Flex>
      ) : (
        <>
          <Title level={1} style={{ color: "#cb5353" }}>
            Nos meilleurs ventes
          </Title>
          <ProductList products={products}></ProductList>
        </>
      )}
    </div>
  );
};

export default Products;
