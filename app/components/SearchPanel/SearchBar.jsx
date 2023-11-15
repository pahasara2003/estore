import Tag from "./Tag";
import { useRef, useState } from "react";

const Searchbar = ({ setSearch, data }) => {
  const input = useRef();
  const form = useRef();
  const [display, SetDisplay] = useState(false);

  const Tags = ["apple", "samsung", "mobile phones", "laptops"];

  return (
    <form
      ref={form}
      className="h-fit flex flex-col justify-center items-center m-5 rounded-xl shadow-md"
    >
      <div className="relative flex justify-center">
        <input
          placeholder="Search your desires ..."
          onFocus={() => {
            SetDisplay(true);
          }}
          onKeyUp={(e) => {
            if (e.target.value !== "") {
              setSearch(e.target.value);
            } else {
              setSearch("phone");
            }
          }}
          ref={input}
          type="text"
          name=""
          className="outline-none w-[90%] text-sm md:text-[1rem] placeholder:text-white h-[48px] text-white px-10 sm:w-[500px] bg-red-400"
        />
        {display && (
          <div
            className="absolute bg-white w-full searchpanel"
            onMouseLeave={() => {
              SetDisplay(false);
            }}
          >
            {data !== null &&
              data.slice(0, 5).map((d) => {
                return (
                  <>
                    <p
                      key={Math.random()}
                      className="p-4 text-[0.8rem] cursor-pointer "
                      onClick={() => {
                        input.current.value = d.name;
                        setSearch(d.name);
                      }}
                    >
                      {d.name}
                    </p>
                    <hr key={Math.random()} />
                  </>
                );
              })}
          </div>
        )}
      </div>

      <div className="p-4  flex  flex-wrap items-center justify-center">
        {Tags.map((tag) => {
          return <Tag key={Math.random()} name={tag} />;
        })}
      </div>
    </form>
  );
};

export default Searchbar;
