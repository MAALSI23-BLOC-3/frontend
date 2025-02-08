import axios from "axios";
import { User, UserLogin } from "../types/User";
import { API_CONFIG } from "../config/api";
import { LoginResponse } from "../types/Api";

class AuthService {
  async login(userLogin: UserLogin): Promise<LoginResponse> {
    const response = await axios.post(
      API_CONFIG.API_BASE_URL + API_CONFIG.SIGNIN,
      userLogin
    );
    return response.data;
  }

  async register(user: User): Promise<LoginResponse> {
    return axios.post(
      API_CONFIG.API_BASE_URL + API_CONFIG.REGISTER + "signup",
      user
    );
  }

  async validateToken(token: string): Promise<User> {
    const response = await axios.get(
      API_CONFIG.API_BASE_URL + API_CONFIG.VALIDATEUSER,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  }
}

export default new AuthService();
