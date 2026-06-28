import axios from "axios";
import { Task } from "@/types/task";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Get all tasks
export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get("/tasks/");
  return response.data;
};

// Create task
export const createTask = async (task: {
  title: string;
  description: string;
}) => {
  const response = await api.post("/tasks/", task);
  return response.data;
};

// Update task
export const updateTask = async (
  id: number,
  task: {
    title: string;
    description: string;
    completed: boolean;
  }
) => {
  const response = await api.put(`/tasks/${id}`, task);
  return response.data;
};

// Delete task
export const deleteTask = async (id: number) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};

// Toggle completion
export const toggleTask = async (id: number) => {
  const response = await api.patch(`/tasks/${id}/toggle`);
  return response.data;
};

export default api;