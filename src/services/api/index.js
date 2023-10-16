import axios from "axios";
import { apiConfig } from "../../../public/config/config";

export const formCategoryApi = async () => {
  const category = await axios.get(
    `${apiConfig.baseUrl}/${apiConfig.formCategory}`
  );
  return category.data;
};
