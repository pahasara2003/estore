import { useState } from "react";
import Skeleton from "react-loading-skeleton";

const SlideShow = () => {
  const [img, setImg] = useState(0);
  const list = ["4a.jpeg", "2.jpeg", "6.jpg", "0a.jpeg"];
  return (
    <div className="p-5 ">
      {(
        <img
          src={`${list[img]}`}
          loading="lazy"
          className="max-w-[600px] h-[400px]  p-2"
        />
      ) || <Skeleton width={"600px"} height={"400px"} />}
      <div className="flex">
        {list.map((a, i) => {
          if (a !== list[img]) {
            return (
              (
                <img
                  src={`${a}`}
                  onClick={() => {
                    setImg(i);
                  }}
                  className="w-[200px] cursor-pointer p-2"
                />
              ) || <Skeleton width={"200px"} height={"100px"} />
            );
          }
        })}
      </div>
    </div>
  );
};

export default SlideShow;
