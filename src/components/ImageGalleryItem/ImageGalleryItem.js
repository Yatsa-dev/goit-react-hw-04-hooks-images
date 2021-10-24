import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem ({ webformatURL, tags, toggleModal, bigImage }){
    return (
      <li className={s.ImageGalleryItem}>
        <img
          src={webformatURL}
          alt={tags}
          className={s.image}
          onClick={() => {
            toggleModal();
            bigImage();
          }}
        />
      </li>
    );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
  toggleModal: PropTypes.func,
  bigImage: PropTypes.func,
};
