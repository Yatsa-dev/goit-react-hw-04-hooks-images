import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal ({closeModal,modalImage}){
 
  useEffect(()=>{
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  })

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      closeModal();
    }
  };

  const backdropClick = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

    return createPortal(
      <div className={s.Overlay} onClick={backdropClick}>
        <div className={s.Modal}>
          <img key={modalImage.id} src={modalImage.img} alt={modalImage.tags} />
        </div>
      </div>,
      modalRoot,
    );
}

Modal.propTypes = {
  closeModal: PropTypes.func,
  ModalImage: PropTypes.object,
};

