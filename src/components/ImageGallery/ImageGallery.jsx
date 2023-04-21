import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, onSelectImg }) => {
  return (
    <>
      <ul className="ImageGallery">
        {images.map(image => {
          return (
            <ImageGalleryItem
              image={image}
              key={image.id}
              onSelectImg={onSelectImg}
            />
          );
        })}
      </ul>
    </>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,

  onSelectImg: PropTypes.func.isRequired,
};
