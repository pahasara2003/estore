import SlideShow from "./SlideShow";
const Hero = () => {
  return (
    <div className="bg-[#f2f2f2] min-h-[87vh] flex justify-evenly flex-wrap items-center">
      <div className="w-[300px] flex-col py-10 items-center flex justify-between">
        <p className="w-full text-center text-lg text-slate-500">
          Our Seasonal Collection
        </p>
        <h1 className="text-[4rem] text-center font-bold">
          The New <br />{" "}
          <span className="text-red-500 text-[5rem] tracking-wider ">
            Arrivals
          </span>
        </h1>
        <button className="p-3 text-white shadow-lg bg-blue-500 px-10 rounded-full">
          Shop Now
        </button>
        <p className="w-full py-5  text-lg text-slate-800">
          Discover modern, High Quality smartphones, Laptops and more other
          electronic devices ...{" "}
        </p>
      </div>
      <div className="px-10">
        <SlideShow />
      </div>
    </div>
  );
};

export default Hero;
