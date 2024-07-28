import axios from "axios";
import { config } from "../../config";
import logger from "../../utils/logger";

const instance = axios.create({
  baseURL: config.serverTap.http,
  timeout: 5000,
});

instance.interceptors.response.use(
  async (response) => {
    return response.data;
  },
  async (error) => {
    logger.error(error);
    return Promise.reject(error);
  }
);

export default instance;