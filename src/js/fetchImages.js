import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '24421312-dc77b6abc824388c4a9ddbce3';
const QUERY_PARAMS = 'image_type=photo&orientation=horizontal&safesearch=true';

export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 40;
  }

  async fetchImages() {
    const { data } = await axios.get(
      `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&${QUERY_PARAMS}&page=${this.page}&per_page=${this.perPage}`,
    );
    this.incrementPage();
    return { data };
  }

  resetPage() {
    this.page = 1;
  }
  incrementPage() {
    this.page += 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
