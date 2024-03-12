import axios from "axios";
import { URL } from "../Utils/common-utils";

export const getReviews = async (id?: string, searchStr?: string): Promise<any> => {
  try {
    const response = await axios.get(`${URL}/reviews/${id}${searchStr ? `?${searchStr}` : ''}`);
    return response.data;
  } catch (error:any) {
    console.log('Error while calling review API:', error.message);
    throw error; // Rethrow the error to handle it elsewhere if needed
  }
};
