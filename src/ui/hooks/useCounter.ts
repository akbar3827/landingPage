import { useState } from "react";

export const useCounter = () => {
  const [liked, setLiked] = useState(false);
  const [int, setInt] = useState(0);
  // let int = 0;
  const LikesRed = () => {
    setLiked(!liked);
  }
  const HandleDecrement = () => {
    // return int--;
    setInt(int - 1);
  };
  const Handleincrement = () => {
    // return int++;
    setInt(int + 1);
  };
  const Res = () => {
    setInt(0);
  };

  return { int, HandleDecrement, Handleincrement, Res, LikesRed, liked};
};
