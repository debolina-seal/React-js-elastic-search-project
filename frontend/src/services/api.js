import axios from "axios";

export const api = {
  async addPost(post) {
    const response = await axios.post("/api/create-post", post);

    return response.data;
  },
  async removePost(id) {
    const response = await axios.delete(`/api/remove-post?id=${id}`);

    return response.data;
  },
  async search(query) {
    const response = await axios.get(`/api/search?query=${query}`);

    return response.data;
  },
  async getAllPosts() {
    const response = await axios.get("/api/posts");

    return response.data;
  },
};