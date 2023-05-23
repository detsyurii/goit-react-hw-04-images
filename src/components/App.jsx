import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchImages } from 'services/fetchImagesApi/fetchImages';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const per_page = 12;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchImages(search, page);
        if (data.hits.length === 0) {
          toast('Жодного зображення не знайдено, введіть інший запит.');
        }
        setImages(prevImages => [...prevImages, ...data.hits]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [search, page]);

  const handleSubmitSearch = submittedSearch => {
    if (submittedSearch === search) {
      toast('Ви ввели попередній запит, спробуйте щось інше.');
      return;
    }
    setSearch(submittedSearch);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleSelectImage = largeImageUrl => {
    setSelectedImage(largeImageUrl);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="App">
      <Searchbar onSubmitSearch={handleSubmitSearch} />
      {isLoading && <Loader />}
      {images && (
        <ImageGallery images={images} onSelectImg={handleSelectImage} />
      )}
      {showModal && <Modal url={selectedImage} onClose={handleCloseModal} />}
      {images.length >= per_page && (
        <Button onClick={handleLoadMore}>Load more</Button>
      )}
      <ToastContainer />
    </div>
  );
};

// export class App extends Component {
//   state = {
//     page: 1,
//     search: '',
//     images: [],
//     isLoading: false,
//     per_page: 12,
//     showModal: false,
//     selectedImage: null,
//   };

//   fetchData = async (page = 1) => {
//     this.setState({ isLoading: true });
//     try {
//       const { data } = await axios.get(BASE_URL, {
//         params: {
//           key: API_KEY,
//           image_type: 'photo',
//           orientation: 'horizontal',
//           q: this.state.search,
//           page: page,
//           per_page: this.state.per_page,
//         },
//       });
//       if (data.hits.length === 0) {
//         toast('Не знайдено жодного зображення, введіть інший запит.');
//       }
//       this.setState(prevState => ({
//         images: [...prevState.images, ...data.hits],
//       }));
//     } catch (error) {
//       console.log(error);
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };

//   componentDidMount() {
//     this.fetchData();
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (
//       prevState.search !== this.state.search ||
//       prevState.page !== this.state.page
//     ) {
//       this.fetchData(this.state.page);
//     }
//   }

//   handleSubmitSearch = search => {
//     if (this.state.search === search) {
//       toast('Ви ввели попередній запит, спробуйте щось інше.');
//       return;
//     }
//     this.setState({ search: search, images: [], page: 1 });
//   };

//   handleLoadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   handleSelectImage = largeImageUrl => {
//     this.setState({ selectedImage: largeImageUrl, showModal: true });
//   };

//   handleCloseModal = () => {
//     this.setState({ showModal: false });
//   };

//   render() {
//     const { images, isLoading, showModal, selectedImage, per_page } =
//       this.state;
//     return (
//       <div className="App">
//         <Searchbar onSubmitSearch={this.handleSubmitSearch} />
//         {isLoading && <Loader />}
//         {images && (
//           <ImageGallery images={images} onSelectImg={this.handleSelectImage} />
//         )}
//         {showModal && (
//           <Modal url={selectedImage} onClose={this.handleCloseModal} />
//         )}
//         {images.length >= per_page && (
//           <Button onClick={this.handleLoadMore}>Load more</Button>
//         )}
//         <ToastContainer />
//       </div>
//     );
//   }
// }
