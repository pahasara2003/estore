import Skeleton from "react-loading-skeleton";

const CardLoader = () => {
  return (
    <div className="w-[300px] text-center items-center justify-between flex flex-col py-2 my-5 shadow-lg hover:ring-[2px] duration-300 cursor-pointer ring-red-400 rounded-xl h-[430px]">
      <Skeleton width={"270px"} height={"250px"} />
      <Skeleton width={"170px"} height={"20px"} />
      <Skeleton width={"210px"} height={"25px"} />
      <Skeleton width={"100px"} height={"25px"} />
      <div className="w-full h-[35px] flex gap-10 justify-center">
        <Skeleton width={"30px"} circle={true} height={"30px"} />

        <Skeleton width={"30px"} circle={true} height={"30px"} />
      </div>
    </div>
  );
};

export default CardLoader;
