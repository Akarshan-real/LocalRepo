import mountainImg from "../../assets/image.png";
import ThemeButton from "../ThemeButton/ThemeButton";

const Card = () => {
  return (
    <div className="w-2/5 rounded-2xl bg-white dark:bg-[#292E37] flex flex-col gap-4 relative">
      <ThemeButton />
      <div className="w-full inset-0 bg-no-repeat bg-cover bg-center rounded-t-2xl h-96" style={{backgroundImage : `url(${mountainImg})`}}></div>
      <h1 className="dark:text-white text-black text-center text-4xl">Mountain Everest</h1>
      <p className="text-center dark:text-gray-500 text-gray-900 px-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut quasi est nulla libero hic, numquam consequatur aliquam sed provident nobis dolorum repudiandae saepe ullam atque rem, quia maiores delectus possimus voluptas culpa. Nam rerum dolor dolorem eum perspiciatis atque quibusdam quam vero, sapiente nemo quisquam cumque aut, quia ea ipsum. Magni saepe reiciendis qui.</p>
      <div className="dark:bg-gray-500 bg-gray-700 flex justify-evenly rounded-b-2xl h-16 text-lg min-h-3/12">
        <span className="flex justify-center items-center flex-col font-semibold">
          <span>
            Tallest
          </span>
          <span>
            mountain
          </span>
        </span>
        <span className="flex justify-center items-center flex-col font-semibold">
          <span>
            7563
          </span>
          <span>
            climbed
          </span>
        </span>
        <span className="flex justify-center items-center flex-col font-semibold">
          <span>
            Height
          </span>
          <span>
            8.85 km
          </span>
        </span>
      </div>
    </div>
  )
}

export default Card
