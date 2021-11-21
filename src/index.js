import './sass/main.scss';
// import axios from 'axios';
import Notiflix from 'notiflix';
import ImagesApiService from './js/fetchImages';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchForm: document.querySelector('.search-form'),
  galleryEl: document.querySelector('.gallery'),
  loadMoreBtnEl: document.querySelector('.load-more'),
};
const imagesApiService = new ImagesApiService();

refs.searchForm.addEventListener('submit', onFormSubmit);
refs.loadMoreBtnEl.addEventListener('click', onLoadMoreClick);

async function onFormSubmit(e) {
  e.preventDefault();
  clearMarkup();
  imagesApiService.query = e.currentTarget.elements.searchQuery.value;
  if (imagesApiService.query === '') {
    Notiflix.Notify.info('Please, type your search query');
    clearMarkup();
    return;
  }

  imagesApiService.resetPage();
  try {
    const { data } = await imagesApiService.fetchImages();
    renderMarkup({ data });
    refs.loadMoreBtnEl.classList.remove('is-hidden');

    if (data.totalHits > 0) {
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    }

    if (data.hits.length === 0) {
      Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again',
      );
      refs.loadMoreBtnEl.classList.add('is-hidden');
      return;
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function onLoadMoreClick() {
  try {
    const { data } = await imagesApiService.fetchImages();
    if (imagesApiService.page > data.totalHits / imagesApiService.perPage) {
      Notiflix.Notify.info('Were sorry, but you have reached the end of search results.');
      refs.loadMoreBtnEl.classList.add('is-hidden');
      return;
    }
    renderMarkup({ data });
  } catch (error) {
    console.log(error.message);
  }
}

// async function onButtonClick() {
//   try {
//     const query = refs.inputEl.value.trim();
//     const images = await API.fetchImages(query);
//     renderMarkup(images);
//   } catch (error) {
//     console.log(error.message);
//   }
// }

function renderMarkup({ data }) {
  const markup = data.hits
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `<div class="photo-card"><a class="gallery__item" href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" class="card-img"/>  
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>
  </a>
 
</div>`;
    })
    .join('');

  refs.galleryEl.insertAdjacentHTML('beforeend', markup);
  makeLightBox();
}

// function showError(error) {
//   console.log(error.message);
// }

function clearMarkup() {
  refs.galleryEl.innerHTML = '';
}

function makeLightBox() {
  const modalWin = new SimpleLightbox('.gallery__item');
}

// function hideLoadMoreBtn() {
//   refs.loadMoreBtnEl.classList.add('is-hidden');
// }
