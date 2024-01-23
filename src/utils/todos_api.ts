import axios from "axios";
const baseUrl = "http://localhost:8080/todos";

export const addTodo = async (task: string) => {
  try {
    const response = await axios.post(`${baseUrl}/add_todo`, {
      description: task,
    });

    return response.data;
  } catch (error) {
    console.error("Error adding todo:", error);
    throw error;
  }
};

export const getTodos = async () => {
  try {
    const response = await axios.get(`${baseUrl}`);
    return response.data;
  } catch (error) {
    console.error("Error getting todos:", error);
    throw error;
  }
};

export const deleteTodo = async (taskID: Number) => {
  try {
    const response = await axios.delete(`${baseUrl}/delete_todo`, {
      params: {
        id: taskID,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};

export const updateTodo = async (taskID: Number, updatedText: String) => {
  try {
    const response = await axios.put(
      `${baseUrl}/update_todo`,
      {
        description: updatedText,
      },
      {
        params: {
          id: taskID,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};
