import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "https://adm-diskominfo.kotabogor.go.id/api";

export const getBanner = async () => {
  try {
    const response = await axios.get(`${API_URL}/banner`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};