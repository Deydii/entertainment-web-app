import { useContext } from 'react';
import { DataContext } from '../../context/dataContext';
import movieCategory from '../../images/icons/icon-category-movie.svg';
import serieCategory from '../../images/icons/icon-category-tv.svg'
import playIcon from '../../images/icons/icon-play.svg';

interface DataCard {
title: string,
thumbnail: {
  small: string,
  medium: string,
  large: string
},
year: number,
category: string,
rating: string,
isBookmarked: boolean
}

const Card = ({
  title,
  thumbnail,
  year,
  category,
  rating,
  isBookmarked
}: DataCard ) => {

  const { handleBookmarkedShows } = useContext(DataContext);

  const handleOnClick = (value: string):void => {
    handleBookmarkedShows(value);
  }

  return (
    <>
    <div className="relative w-auto min-[375px]:w-[164px] min-[425px]:w-auto md:w-[220px] lg:w-auto">
      <div className="relative group hover:cursor-pointer hover:scale-[1.05] transition duration-300 ease-in-out">
         <div className="hidden lg:block">
          <img className="rounded-lg h-auto group-hover:opacity-75" src={thumbnail.large} alt={title} />
        </div>
        <div className="hidden md:block lg:hidden">
          <img className="rounded-lg h-auto group-hover:opacity-75" src={thumbnail.medium} alt={title} />
        </div>
        <div className="block md:hidden">
          <img className="rounded-lg h-auto group-hover:opacity-75" src={thumbnail.small} alt={title} />
        </div>
        <button className="absolute opacity-0 group-hover:opacity-100 flex justify-center items-center space-x-4 z-2 w-20 h-6 md:w-24 md:h-8 lg:w-28 lg:h-12 rounded-full bg-white/[0.40] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" type="button">
          <img className="w-4 h-4 lg:w-auto lg:h-auto" src={playIcon} alt="play icon" />
          <p className="text-white text-base lg:text-lg">Play</p>
        </button>
      </div>
      {isBookmarked ? (
        <div onClick={() => handleOnClick(title)} className="flex justify-center items-center absolute z-2 top-3 right-4 rounded-full w-7 h-7 bg-blue-200 hover:cursor-pointer" >
          <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.61 0c.14 0 .273.028.4.083a1.03 1.03 0 0 1 .657.953v11.928a1.03 1.03 0 0 1-.656.953c-.116.05-.25.074-.402.074-.291 0-.543-.099-.756-.296L5.833 9.77l-4.02 3.924c-.218.203-.47.305-.756.305a.995.995 0 0 1-.4-.083A1.03 1.03 0 0 1 0 12.964V1.036A1.03 1.03 0 0 1 .656.083.995.995 0 0 1 1.057 0h9.552Z" fill="#FFF"/>
          </svg>
        </div>
      ) 
      : (
        <div onClick={() => handleOnClick(title)} className=" group flex justify-center items-center absolute z-2 top-3 right-4 rounded-full w-7 h-7 bg-blue-200 hover:bg-white hover:cursor-pointer">
          <svg className="stroke-white group-hover:stroke-blue-900" width="12" height="14" xmlns="http://www.w3.org/2000/svg">
            <path d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z" strokeWidth="1.5" fill="none"/>
          </svg>
        </div>
       )
      }
      <div className="mt-2">
        <ul className="flex space-x-2 lg:space-x-3 list-none text-xs text-white/75">
          <li>{year}</li>
          <li className="flex items-center before:inline-block before:w-[3px] before:h-[3px] before:mr-2 before:bg-white/50 before:rounded-full">
            <img className="mr-2"src={category === "film" ? movieCategory : serieCategory} alt={`${category} category icon`} />
            {category}
          </li>
          <li className="flex items-center before:inline-block before:w-[3px] before:h-[3px] before:mr-2 before:bg-white/50 before:rounded-full">
            {rating}
          </li>
        </ul>
        <p className="mt-1 text-xs md:text-lg lg:text-xl text-white">{title}</p>
      </div>
    </div>
   </>
  )
};

export default Card;