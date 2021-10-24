import {useState} from "react";
import PropTypes from 'prop-types';
import { toast } from "react-toastify";
import s from './SearchForm.module.css'

export default function SearchForm ({onSubmit}) {
   const[query, setQuery] = useState('');
  
   const handleQueryChange = event => {
      setQuery(event.currentTarget.value.toLowerCase());
    };
   const handleSubmit = event => {
        event.preventDefault();
        if(query.trim() === ''){
        toast.error('Sorry,input field is empty');
        return;
        }
        setQuery('');
        onSubmit(query)
    };
        return(
            <form onSubmit={handleSubmit} className={s.SearchForm}>
          <button type="submit" className={s.button}>
            <span className={s.buttonLabel}>Search</span>
          </button>
          <input
            className={s.input}
            value={query}
            onChange={handleQueryChange}
            type="text"
            placeholder="Search images and photos"
          />
        </form>
        )
}
SearchForm.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.string,
};