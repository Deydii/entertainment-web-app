import cardImage from '../../assets/thumbnails/the-great-lands/regular/large.jpg';
import movieCategory from '../../assets/icons/icon-category-movie.svg';
import playIcon from '../../assets/icons/icon-play.svg';

const Card = () => {
  return (
    <>
    <div className="relative w-72 h-auto">
      <div className="relative group hover:cursor-pointer">
        <img className="rounded-lg w-full h-[174px] group-hover:opacity-75" src={cardImage} alt="Beyond Earth movie" />
        <button className="absolute opacity-0 group-hover:opacity-100 flex justify-center items-center space-x-4 z-2 w-28 h-12 rounded-full bg-white/[0.40] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" type="button">
          <img src={playIcon} alt="play icon" />
          <p className="text-white text-lg">Play</p>
        </button>
      </div>
      <div className="group flex justify-center items-center absolute z-2 top-3 right-4 rounded-full w-7 h-7 bg-blue-200 hover:bg-white hover:cursor-pointer">
        <svg className="stroke-white group-hover:stroke-blue-900" width="12" height="14" xmlns="http://www.w3.org/2000/svg">
          <path d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z" stroke-width="1.5" fill="none"/>
        </svg>
      </div>
      <div className="mt-2">
        <ul className="flex space-x-3 list-none text-xs text-white/75">
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

export default Card;