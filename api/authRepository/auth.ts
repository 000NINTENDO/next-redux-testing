import axios from "axios";

class AuthService {
  private url = process.env.NEXT_PUBLIC_TWITTER_API;
  private authUrl = `${this.url}/user`;

  signIn = async (data) => {
    return axios.post(`${this.authUrl}/signin`, data);
  };

  signUp = async (data) => {
    return axios.post(`${this.authUrl}/signup`, data);
  };
}

const authRepository = new AuthService();
export default authRepository;
