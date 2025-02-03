import { List } from "antd";
import ProductCard from "./ProductCard"; // Your existing product component
import { Product } from "../types/Product";

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <List
      grid={{
        gutter: 16,
        column: 4,
        xs: 1,
        sm: 1,
        md: 2,
        lg: 3,
        xxl: 4,
      }}
      style={{ padding: "16px" }}
      dataSource={products}
      renderItem={(product) => (
        <List.Item>
          <ProductCard product={product} />
        </List.Item>
      )}
    />
  );
};

export default ProductList;
