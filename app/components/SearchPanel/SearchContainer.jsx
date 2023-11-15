import { useState, useEffect } from "react";
import Card from "./Card";
import { Heading } from "@radix-ui/themes";
import SearchBar from "./SearchBar";
import CardLoader from "./CardLoader";
import OnCard from "./OnCard";
import { Popover } from "@radix-ui/themes";
import { FaShoppingCart } from "react-icons/fa";
import MiniCart from "./MiniCart";

const SearchContainer = () => {
  const [search, setSearch] = useState("phone");
  const [data, setData] = useState([]);
  const [state, setState] = useState(true);
  const id = sessionStorage.getItem("id");
  useEffect(() => {
    const Fetch = async () => {
      fetch(`http://localhost:3000/api/products`)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setState(true);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    Fetch();
    return () => {
      setState(false);
    };
  }, [search]);

  console.log(data);
  return (
    <div className="bg-white pt-11 min-h-[110vh]">
      <SearchBar setSearch={setSearch} data={data} />

      <Popover.Root>
        <Popover.Trigger>
          <button className="fixed bottom-10 right-10   bg-gradient-to-tr from-red-300 to-red-400 w-[70px] h-[70px] shadow-2xl rounded-full">
            <FaShoppingCart className="text-center  w-full text-[2rem] text-white" />
          </button>
        </Popover.Trigger>
        <Popover.Content size={"2"}>
          <MiniCart />
        </Popover.Content>
      </Popover.Root>

      <div className="w-[90vw] gap-3 flex flex-wrap justify-evenly mx-auto ">
        {state && data.length > 1 ? (
          data.map((product) => {
            return (
              <Card
                data={product}
                key={Math.random()}
                wish={product.wishlist_status === "1"}
                cart={product.cart_status === "1"}
                state={state}
              />
            );
          })
        ) : data[0] !== undefined ? (
          <OnCard
            data={data[0]}
            wish={data[0].wishlist_status === "1"}
            cart={data[0].cart_status === "1"}
          />
        ) : state ? (
          <Heading className="py-10">
            Sorry, We haven't got any match ...
          </Heading>
        ) : (
          <>
            <CardLoader />
            <CardLoader />
            <CardLoader />
            <CardLoader />
            <CardLoader />
            <CardLoader />
            <CardLoader />
            <CardLoader />
          </>
        )}
      </div>
    </div>
  );
};

export default SearchContainer;
