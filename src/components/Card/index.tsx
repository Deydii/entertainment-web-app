import { useContext } from 'react';
import { DataContext } from '../../context/dataContext';
import Image from 'next/image';
// import playIcon from '../../images/icons/icon-play.svg';

interface DataCard {
  name?: string, 
  first_air_date: string,
  release_date: string,
  title?: string,
  backdrop_path: string,
  media?: string,
  id: number
}

const Card = ({
  name,
  first_air_date,
  release_date,
  title,
  backdrop_path,
  media,
  id
}: DataCard ) => {

  const { handleBookmarkedShows } = useContext(DataContext);

  const year = first_air_date?.slice(0,4) || release_date?.slice(0,4);

  const handleOnClick = (value: number):void => {
    handleBookmarkedShows(value);
  }

  return (
    <>
    <div data-testid="cards" className="relative w-[135px] min-[375px]:w-[164px] min-[425px]:w-auto md:w-[220px] lg:w-auto">
      <div className="relative group hover:cursor-pointer hover:scale-[1.05] transition duration-300 ease-in-out">
         <div className="hidden lg:block lg:relative lg:w-auto lg:h-48">
          <Image
            className="rounded-lg"
            src={`https://image.tmdb.org/t/p/w780${backdrop_path}`}
            fill
            sizes="(max-width: 768px) 50vw,
            (max-width: 1200px) 33vw,
            25vw"
            alt={`${name} image` || `${title} image`}
          />
        </div>
        <div className="hidden md:block md:relative md:w-auto md:h-36 lg:hidden">
          <Image
            className="rounded-lg"
            src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
            fill

            alt={`${name} image` || `${title} image`}
          />
        </div>
        <div className="block relative w-auto h-28 md:hidden">
          <Image
            className="rounded-lg"
            src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
            fill
            alt={`${name} image` || `${title} image`}
          />
        </div>
        {/* <button className="absolute opacity-0 group-hover:opacity-100 flex justify-center items-center space-x-4 z-2 w-20 h-6 md:w-24 md:h-8 lg:w-28 lg:h-12 rounded-full bg-white/[0.40] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" type="button">
          <img className="w-4 h-4 lg:w-auto lg:h-auto" src={playIcon} alt="play icon" />
          <p className="text-white text-base lg:text-lg">Play</p>
        </button> */}
      </div>
      {/* {isBookmarked ? (
        <div data-testid="svg" onClick={() => handleOnClick(title)} className="flex justify-center items-center absolute z-2 top-3 right-4 rounded-full w-7 h-7 bg-blue-200 hover:cursor-pointer" >
          <svg role="img" width="12" height="14" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.61 0c.14 0 .273.028.4.083a1.03 1.03 0 0 1 .657.953v11.928a1.03 1.03 0 0 1-.656.953c-.116.05-.25.074-.402.074-.291 0-.543-.099-.756-.296L5.833 9.77l-4.02 3.924c-.218.203-.47.305-.756.305a.995.995 0 0 1-.4-.083A1.03 1.03 0 0 1 0 12.964V1.036A1.03 1.03 0 0 1 .656.083.995.995 0 0 1 1.057 0h9.552Z" fill="#FFF"/>
          </svg>
        </div>
      ) 
      : (*/}
        <div data-testid="svg" onClick={() => handleOnClick(id)} className=" group flex justify-center items-center absolute z-2 top-1 right-2 rounded-full w-7 h-7 bg-blue-200 hover:bg-white hover:cursor-pointer">
          <svg role="img" className="stroke-white group-hover:stroke-blue-900" width="12" height="14" xmlns="http://www.w3.org/2000/svg">
            <path d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z" strokeWidth="1.5" fill="none"/>
          </svg>
        </div>
       {/* )
      }  */}

      <div className="mt-2">
        <ul className="flex space-x-2 lg:space-x-3 list-none text-xs text-white/75">
          <li>{year}</li>
          <li className="flex items-center before:inline-block before:w-[3px] before:h-[3px] before:mr-2 before:bg-white/50 before:rounded-full">
            <Image 
              className="mr-2"
              src={media === "tv" ? '/images/icons/icon-category-tv.svg' : '/images/icons/icon-category-movie.svg'} 
              width={12}
              height={12}
              alt={media === "tv" ? "Tv category icon" : "Movie category icon"} 
            />
            {media === "tv" ? "Tv" : "Movie"} 
          </li>
        </ul>
        <p className="mt-1 text-xs md:text-lg lg:text-xl text-white">{name || title}</p>
      </div>
    </div>
   </>
  )
};

export default Card;