import axios from 'axios';
import { API_URL, API } from '@/shared/api';

export default class AuthService {
  static async signIn(email: string, password: string) {
    return API.post('/auth/sign-in', { email, password });
  }

  static async signUp(email: string, password: string) {
    return API.post('/auth/sign-up', { email, password });
  }

  static async logout() {
    return API.post('/auth/logout');
  }

  static async refresh() {
    return axios.get(`${API_URL}/auth/refresh`, { withCredentials: true });
  }
}