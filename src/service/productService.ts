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

  async getById(id: string): Promise<Product> {
    return axios.get(API_CONFIG.SINGLEPRODUCT + `/${id}`);
  }
}

export default new ProductService();
