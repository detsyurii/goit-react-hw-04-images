import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ image, onSelectImg }) => {
  return (
    <li className="ImageGalleryItem">
      <img
        className="ImageGalleryItem-image"
        src={image.webformatURL}
        alt={image.tags}
        onClick={() => onSelectImg(image.largeImageURL)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,

  onSelectImg: PropTypes.func.isRequired,
};
