import axios from "axios";
import { API_CONFIG } from "../config/api";
import { Product } from "../types/Product";

class ProductService {
  async getAll(): Promise<Product[]> {
    const response = await axios.get(
      API_CONFIG.API_BASE_URL + API_CONFIG.ALLPRODUCTS
    );
    return response.data;
  }

  async getById(id: number): Promise<Product> {
    const res = await axios.get(
      API_CONFIG.API_BASE_URL + API_CONFIG.SINGLEPRODUCT + `/${id}`
    );
    return res.data;
  }
}

export default new ProductService();
