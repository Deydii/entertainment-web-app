import bookmarkIcon from '../../../images/icons/icon-bookmark-empty.svg';
import movieCategory from '../../../images/icons/icon-category-movie.svg';
import serieCategory from '../../../images/icons/icon-category-tv.svg'
import playIcon from '../../../images/icons/icon-play.svg';

interface TrendingCardData {
  title: string,
  thumbnail?: {
    small: string,
    large: string
  },
  year: number,
  category: string,
  rating: string
}

const TrendingCard = ({
  title,
  thumbnail,
  year,
  category,
  rating
} : TrendingCardData ) => {

  return (
    <>
      <div className="group relative flex-shrink-0 snap-start hover:cursor-pointer hover:scale-[1.05] transition duration-300 ease-in-out">
       <div className="hidden md:block md:w-[470px] md:h-[230px]">
         <img className="rounded-lg h-full w-full group-hover:opacity-75" src={thumbnail?.large} alt={title} />
       </div>
       <div className="block w-[240px] h-[140px] md:hidden">
         <img className="rounded-lg h-full w-full group-hover:opacity-75" src={thumbnail?.small} alt={title} />
       </div>
        <div className="flex justify-center items-center absolute z-2 top-3 right-4 rounded-full w-7 h-7 bg-blue-200">
          <img src={bookmarkIcon} alt="bookmark icon" />
        </div>
        <button className="opacity-0 group-hover:opacity-100 flex justify-center items-center space-x-4 absolute z-2 w-20 h-6 md:w-28 md:h-12 rounded-full bg-white/[0.40] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" type="button">
          <img className="w-4 h-4 md:w-auto md:h-auto" src={playIcon} alt="play icon" />
          <p className="text-white text-base md:text-lg">Play</p>
        </button>
        <div className="absolute z-2 left-5 bottom-2 md:bottom-6">
          <ul className="flex space-x-1 md:space-x-3 list-none text-sm text-white/75">
            <li>{year}</li>
            <li className="flex items-center before:inline-block before:w-[3px] before:h-[3px] before:mr-2 before:bg-white/50 before:rounded-full">
              <img className="mr-2"src={category === "film" ? movieCategory : serieCategory} alt={`${category} category icon`} />
              {category}
            </li>
            <li className="flex items-center before:inline-block before:w-[3px] before:h-[3px] before:mr-2 before:bg-white/50 before:rounded-full">
              {rating}
            </li>
          </ul>
          <p className="mt-1 text-sm md:text-xl text-white ">{title}</p>
        </div>
      </div>
     </>
  )
};

export default TrendingCard;