import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem'
import s from './ImageGallery.module.css';

export default function ImageGallery({ data,toggleModal,bigImage }){
    return (
      <ul className={s.ImageGallery}>
        {data.map(el => (
          <ImageGalleryItem
            key={el.id}
            id={el.id}
            webformatURL={el.webformatURL}
            largeImageURL={el.largeImageURL}
            tags={el.tags}
            toggleModal={() => toggleModal()}
            bigImage={() => bigImage(el.id, el.largeImageURL, el.tags)}
          />
        ))}
      </ul>
    );
}

ImageGallery.propTypes = {
  query: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      tags: PropTypes.string,
      webformatURL: PropTypes.string,
      largeImageURL: PropTypes.string,
    }),
  ),
  bigImage: PropTypes.func,
  toggleModal: PropTypes.func,
};
