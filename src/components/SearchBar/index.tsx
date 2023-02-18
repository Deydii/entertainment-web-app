import { useState, useContext } from 'react';
import { DataContext } from '../../context/dataContext';
import searchIcon from '../../images/icons/icon-search.svg';

const SearchBar = () => {

  const { getShows } = useContext(DataContext);

  const [inputValue, setInputValue] = useState("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
    setInputValue(e.target.value);
    getShows(e.target.value);
  };

  return(
    <div className='mt-[6.5vh] flex'>
      <img className="self-start" src={searchIcon} alt="search icon" />
      <form className="ml-4 w-3/4	md:w-[90%]">
        <input
          className="w-full h-full pb-4 border-0 bg-transparent placeholder:text-base text-xl text-white md:placeholder:text-xl placeholder:opacity-60 cursor-pointer caret-red focus:outline-0 focus:border-b focus:border-white/50"
          type="text"
          placeholder="Search for movie or TV series"
          value={inputValue}
          onChange={handleOnChange}
        />
      </form>
    </div>
  )
};

export default SearchBar;