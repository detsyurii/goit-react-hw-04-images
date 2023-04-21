import axios from 'axios';
import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

const API_KEY = '31666644-bae50b9e8708dc3dd7c98b43c';
const BASE_URL = 'https://pixabay.com/api/';

export class App extends Component {
  state = {
    page: 1,
    search: '',
    images: [],
    isLoading: false,
    per_page: 12,
    showModal: false,
    selectedImage: null,
  };

  fetchData = async (page = 1) => {
    this.setState({ isLoading: true });
    try {
      const { data } = await axios.get(BASE_URL, {
        params: {
          key: API_KEY,
          image_type: 'photo',
          orientation: 'horizontal',
          q: this.state.search,
          page: page,
          per_page: this.state.per_page,
        },
      });
      if (data.hits.length === 0) {
        toast('Не знайдено жодного зображення, введіть інший запит.');
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
      }));
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.search !== this.state.search ||
      prevState.page !== this.state.page
    ) {
      this.fetchData(this.state.page);
    }
  }

  handleSubmitSearch = search => {
    if (this.state.search === search) {
      toast('Ви ввели попередній запит, спробуйте щось інше.');
      return;
    }
    this.setState({ search: search, images: [], page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleSelectImage = largeImageUrl => {
    this.setState({ selectedImage: largeImageUrl, showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { images, isLoading, showModal, selectedImage, per_page } =
      this.state;
    return (
      <div className="App">
        <Searchbar onSubmitSearch={this.handleSubmitSearch} />
        {isLoading && <Loader />}
        {images && (
          <ImageGallery images={images} onSelectImg={this.handleSelectImage} />
        )}
        {showModal && (
          <Modal url={selectedImage} onClose={this.handleCloseModal} />
        )}
        {images.length >= per_page && (
          <Button onClick={this.handleLoadMore}>Load more</Button>
        )}
        <ToastContainer />
      </div>
    );
  }
}
