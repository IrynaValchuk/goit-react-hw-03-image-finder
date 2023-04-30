import axios from 'axios';
import { BASE_URL, API_KEY, PER_PAGE } from 'constants';

export const fetchImages = async (query, page) => {
  const params = {
    key: `${API_KEY}`,
    q: `${query}`,
    image_type: 'photo',
    orientation: 'horizontal',
    page: `${page}`,
    per_page: `${PER_PAGE}`,
  };

  return await axios.get(`${BASE_URL}`, { params }).then(({ data }) => data);
};
