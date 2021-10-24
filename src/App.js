/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-self-compare */
import { useState,useEffect } from 'react';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.module.css';

import fetchApi from 'components/Service-api';
import Container from 'components/Container';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Modal from 'components/Modal';
import Spinner from 'components/Spinner';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function App () {
  const[status,setStatus] = useState(Status.IDLE);
  const[query,setQuery] = useState('');
  const[page,setPage] = useState(1);
  const[imageArr,setImageArr] = useState([]);
  const[modalLargeImage, setModalLargeImage] = useState('');
  const[showModal,setShowModal] = useState(false);
  
useEffect(() => {
 if(!query){
   return
 }
    setStatus(Status.PENDING );
      fetchApi(query, page)
      .then(data => data.hits)
      .then(data => {
        setImageArr([...imageArr,...data]);
        setStatus(Status.RESOLVED)
          if(page!==1) {
            window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          })
        }
      });
},[page,query])

const handleFormSubmit = query =>{
  setQuery(query);
  setPage (1);
  setImageArr([]);
};

const buttonLoadMore = () => {
    setPage (page + 1);
    setStatus(Status.PENDING)
};

const toggleModal = () => {
  setShowModal(!showModal)
};

const modalImage = (id, img, tags) => {
  setModalLargeImage({ id: id, img: img, tags: tags })
};

    return (
      <Container>
        <Searchbar onSubmit={handleFormSubmit} />
        <ImageGallery
          data={imageArr}
          toggleModal={toggleModal}
          bigImage={modalImage}
        />
        {status === Status.PENDING && <Spinner />}
        {imageArr.length > 0 && <Button onClick={buttonLoadMore} />}
        {showModal && <Modal closeModal={toggleModal} modalImage={modalLargeImage} />}
        <ToastContainer autoClose={2000}/>
        </Container>
    );
 }

