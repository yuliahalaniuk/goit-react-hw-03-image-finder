import axios from 'axios';

const API_KEY = '37711796-3b567f1c67dcaa6a50c805c9a';
axios.defaults.baseURL = 'https://pixabay.com';

export async function fetchImages(page, neededQuery) {
  return await axios
    .get(`/api/`, {
      params: {
        key: API_KEY,
        q: neededQuery,
        page: page,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 12,
      },
    })
    .then(response => {
      return response.data;
    });
}
