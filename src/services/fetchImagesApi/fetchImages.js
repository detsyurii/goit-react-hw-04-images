import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31666644-bae50b9e8708dc3dd7c98b43c';
const RESPONSE_OK = 200;

const searchParams = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  per_page: 12,
};

export async function fetchImages(query, page = 1) {
  searchParams.q = query;
  searchParams.page = page;
  const response = await axios.get(BASE_URL, { params: searchParams });
  if (response.status !== RESPONSE_OK) {
    throw new Error(response.status);
  }
  return response.data;
}
