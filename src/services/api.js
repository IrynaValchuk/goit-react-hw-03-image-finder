import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34345313-e136fe2b46f52c58a614c87be';

export const fetchImages = async (query, page) => {
  const params = {
    key: `${API_KEY}`,
    q: `${query}`,
    image_type: 'photo',
    orientation: 'horizontal',
    page: `${page}`,
    per_page: 12,
  };

  return await axios
    .get(`${BASE_URL}`, { params })
    .then(response => response.data);
};
