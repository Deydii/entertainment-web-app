import cardImage from '../../../assets/thumbnails/beyond-earth/trending/large.jpg';
import bookmarkIcon from '../../../assets/icons/icon-bookmark-empty.svg';
import movieCategory from '../../../assets/icons/icon-category-movie.svg';
import playIcon from '../../../assets/icons/icon-play.svg';

const TrendingCard = () => {
  return (
    <>
      <div className="group relative w-[470px] h-[230px] flex-shrink-0 snap-start hover:cursor-pointer">
        <img className="rounded-lg h-full w-full group-hover:opacity-75" src={cardImage} alt="Beyond Earth movie" />
        <div className="flex justify-center items-center absolute z-2 top-3 right-4 rounded-full w-7 h-7 bg-blue-200">
          <img src={bookmarkIcon} alt="bookmark icon" />
        </div>
        <button className="opacity-0 group-hover:opacity-100 flex justify-center items-center space-x-4 absolute z-2 w-28 h-12 rounded-full bg-white/[0.40] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" type="button">
          <img src={playIcon} alt="play icon" />
          <p className="text-white text-lg">Play</p>
        </button>
        <div className="absolute z-2 left-5 bottom-6">
          <ul className="flex space-x-3 list-none text-sm text-white/75">
            <li>2019</li>
            <li className="flex items-center before:inline-block before:w-[3px] before:h-[3px] before:mr-2 before:bg-white/50 before:rounded-full">
              <img className="mr-2"src={movieCategory} alt="movie category icon" />
              Movie
            </li>
            <li className="flex items-center before:inline-block before:w-[3px] before:h-[3px] before:mr-2 before:bg-white/50 before:rounded-full">
              PG
            </li>
          </ul>
          <p className="flex space-x-3 list-none text-xl text-white">Beyond Earth</p>
        </div>
      </div>
     </>
  )
};

export default TrendingCard;