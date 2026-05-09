import axios from "axios";

const aiApi = axios.create({
  baseURL: import.meta.env.VITE_AI_URL,
});

export const aiSearch = async (query: string) => {
  const response = await aiApi.post("/ai/search", { query });
  return response.data;
};

export const getRecommendations = async (
  liked_genres: string[],
  message: string
) => {
  const response = await aiApi.post("/ai/recommendations", {
    liked_genres,
    message,
  });
  return response.data;
};