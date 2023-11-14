import { useState, useEffect } from "react";
import WishList from "./WishList";
import Cart from "./Cart";
import Details from "./Details";
import Skeleton from "react-loading-skeleton";
import ProfileTitle from "../../app/components/ProfileTitle";
import { Tabs, Box } from "@radix-ui/themes";
import { Navigate } from "react-router-dom";
import NavBar from "../NavBar";

const Dashboard = ({ page }) => {
  const [data, setData] = useState(null);

  const list = [
    { title: "Your Billing Information", element: <Details data={data} /> },
    { title: "Your Cart", element: <Cart /> },
    { title: "Your Wishlist", element: <WishList /> },
  ];
  const id = sessionStorage.getItem("id");
  if (id === null) {
    Navigate("/E-Store");
  }

  useEffect(() => {
    const Fetch = async () => {
      const response = await fetch(
        `https://server.byte-burst.xyz/?action=getprofile&user=${id}`
      );
      const data = await response.json();
      setData(data);
    };

    Fetch();
  }, []);

  return (
    <>
      <NavBar />
      <div className="pt-5 my-0 md:my-10 md:mx-[10vw] min-h-[800px] rounded-lg bg-white shadow-md   ">
        {data !== null ? (
          <>
            <ProfileTitle name={data[0].FirstName} />

            <Box px="4" pt="3" pb="2">
              {list[page].element}
            </Box>
          </>
        ) : (
          <>
            <Skeleton className="mx-5" width={"90%"} height={"130px"} />
            <Skeleton className="mx-5 my-5" width={"90%"} height={"530px"} />
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
