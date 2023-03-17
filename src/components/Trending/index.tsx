import Image from 'next/image';
// import playIcon from '../../../images/icons/icon-play.svg';

interface TrendingCardData {
  name?: string, 
  first_air_date: string,
  release_date: string,
  title?: string,
  category: string,
  backdrop_path: string
}

const TrendingCard = ({
  name,
  first_air_date,
  release_date,
  title,
  category,
  backdrop_path
} : TrendingCardData ) => {

  const year = first_air_date?.slice(0,4) || release_date?.slice(0,4);

  return (
    <>
      <div data-testid="trending" className="group relative flex-shrink-0 snap-start hover:cursor-pointer hover:scale-[1.05] transition duration-300 ease-in-out">
        <div className="hidden md:block">
          <Image
            className="rounded-lg opacity-80"
            priority={true}
            src={`https://image.tmdb.org/t/p/w780${backdrop_path}`}
            width={470}
            height={230}
            alt={`${name} image` || `${title} image`}
            style={{ width: "auto", height:"auto"}}
          />
        </div>
        <div className="block md:hidden">
          <Image
            className="rounded-lg opacity-80"
            priority={true}
            src={`https://image.tmdb.org/t/p/w780${backdrop_path}`}
            width={240}
            height={140}
            alt={`${name} image` || `${title} image`}
            style={{ width: "auto", height:"auto"}}
          />
       </div>
        <div className="flex justify-center items-center absolute z-2 top-3 right-4 rounded-full w-7 h-7 bg-blue-200">
          <Image 
            src="/images/icons/icon-bookmark-empty.svg"
            width={12}
            height={14}
            alt="bookmark icon" 
          />
        </div>
        {/* <button className="opacity-0 group-hover:opacity-100 flex justify-center items-center space-x-4 absolute z-2 w-20 h-6 md:w-28 md:h-12 rounded-full bg-white/[0.40] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" type="button">
          <img className="w-4 h-4 md:w-auto md:h-auto" src={playIcon} alt="play icon" />
          <p className="text-white text-base md:text-lg">Play</p>
        </button> */}
        <div className="absolute z-2 left-5 bottom-2 md:bottom-6">
          <ul className="flex space-x-1 md:space-x-3 list-none text-sm text-white/75">
            <li>{year}</li>
            <li className="flex items-center capitalize before:inline-block before:w-[3px] before:h-[3px] before:mr-2 before:bg-white/50 before:rounded-full">
              <Image 
                className="mr-2"
                src={category === "movie" ? "/images/icons/icon-category-movie.svg" : "/images/icons/icon-category-tv.svg"} 
                width={12} 
                height={12}
                alt={`${category} category icon`} 
              />
              {category}
            </li>
          </ul>
          <p className="mt-0 md:mt-1 text-sm md:text-xl text-white">{name || title}</p>
        </div>
      </div>
     </>
  )
};

export default TrendingCard;