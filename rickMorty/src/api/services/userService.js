import { api } from "../axiosClient";

export const characterService = {
  getAll: () => api.get("/character"), //todos los caracteres 
  getOne: (id)=> api.get(`/character/${id}`),
  create: (data) => api.post("/character",data),
  update: (id, data) => api.put(`/character/${id}`, data),
  delete: (id) => api.delete(`/character/${id}`)
};



