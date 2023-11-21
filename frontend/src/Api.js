import axios from 'axios';

const API_BASE_URL = 'https://api.biblia.com/v1/bible';
const API_KEY = process.env.BIBLE_API_KEY;

export const getTableOfContents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/contents/LEB?key=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching table of contents:', error);
    throw error; 
  }
};
