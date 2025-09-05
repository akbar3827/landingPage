import { useCounter } from "./hooks/useCounter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Counter = () => {
  const { int, HandleDecrement, Handleincrement, Res, LikesRed, liked } =
    useCounter();

  return (
    <>
      <div className="flex gap-4 pb-4">
        <button
          onClick={HandleDecrement}
          className="py-5 px-7 m-2 bg-gray-800 rounded-xl text-3xl"
        >
          -
        </button>
        <h4 className="py-4 px-3 m-2 text-4xl">{int}</h4>
        <button
          onClick={Handleincrement}
          className="py-4 px-7 m-2 bg-gray-800 rounded-xl text-2xl"
        >
          +
        </button>
      </div>
      <button
        onClick={Res}
        className="py-5 px-9 m-2 bg-gray-800 rounded-xl text-md"
      >
        Reset
      </button>
      <button onClick={LikesRed}>
        <FontAwesomeIcon icon={faHeart} color={liked ? "red" : "white"} />
      </button>
    </>
  );
};

export default Counter;
