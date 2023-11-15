import Stars from "./Stars";
import "@radix-ui/themes/styles.css";
import Skeleton from "react-loading-skeleton";

const PopoverContent = ({ data, inCart, isWished, setWish, setCart }) => {
  return (
    <>
      <div className=" text-center items-center gap-5 justify-center flex  flex-wrap max-w-[80vw] p-5  duration-300  ">
        {(
          <img
            className="max-w-[230px] min-h-[20vw] object-cover max-h-[250px]"
            src={`${data.image_url}`}
          />
        ) || <Skeleton width={"270px"} height={"250px"} />}
        <div>
          <div>
            <h1 className=" text-[1.3rem] tracking-wide font-bold ">
              {data.name}
            </h1>

            <p>
              From{" "}
              <span className="font-bold text-blue-400">{data.company}</span>
            </p>

            <p className="text-red-400 text-lg font-bold">{data.price} $</p>
            <Stars data={data.ratings} />
          </div>

          <div className="m-3 text-left ">
            <p>{data.specifications}</p>
            <p className="my-1 text-slate-500 font-bold tracking-wider">
              <span className="text-red-400">{data.remaining}</span> of{" "}
              {data.stock_amount} remaining
            </p>
          </div>

          <div className="flex  flex-wrap border-t-2 pt-2 w-full justify-center text-slate-500  duration-0">
            <button
              onClick={() => {
                setWish((prev) => !prev);
              }}
              className={`text-center outline-none w-[150px] m-3 py-2 h-[35px] text-sm   ${
                isWished
                  ? "text-blue-400 ring-1 ring-blue-400"
                  : "bg-blue-400 text-white"
              }`}
            >
              {isWished ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>
            <button
              onClick={() => {
                setCart((prev) => !prev);
              }}
              className={`text-center outline-none w-[150px] h-[35px] m-3 py-2 text-sm   ${
                inCart
                  ? "text-red-400 ring-1 ring-red-400"
                  : "bg-red-400 text-white"
              }`}
            >
              {inCart ? "Remove from Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopoverContent;
