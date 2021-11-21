import axios from 'axios';

// axios.defaults.baseURL = 'https://pixabay.com/api?key=24421312-dc77b6abc824388c4a9ddbce3';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '24421312-dc77b6abc824388c4a9ddbce3';
const QUERY_PARAMS = 'image_type=photo&orientation=horizontal&safesearch=true';

export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 40;
  }

  //   fetchImages() {
  //     return fetch(
  //       `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&${QUERY_PARAMS}&page=${this.page}&per_page=${this.perPage}`,
  //     )
  //       .then(response => response.json())
  //       .then(({ hits }) => {
  //         this.incrementPage();

  //         return hits;
  //       });
  //   }

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

// const getContacts = async () => {
//   const response = await axios.get(`/contacts`);
//   return response.data;
// };

// async function fetchImages(query) {
//   const response = await axios.get(
//     `/${query}&image_type=photo&orientation=horizontal&safesearch=true`,
//   );
//   return response.hits;
// }

// export default { fetchImages };
