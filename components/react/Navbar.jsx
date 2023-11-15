"use client";
import { BsFillPersonLinesFill } from "react-icons/bs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoHome, IoDiamondSharp, IoPersonRemoveSharp } from "react-icons/io5";
import { FaShoppingBag } from "react-icons/fa";
import { useEffect, useState } from "react";

const NavItem = ({ link, text, icon }) => {
  const path = usePathname();

  return (
    <Link
      href={link}
      className={`${
        path === link ? " ring-1 ring-gray-200" : "text-slate-400"
      }  flex p-3 gap-5 px-5 rounded-md  items-center `}
    >
      <span className="text-[1.5rem]">{icon}</span>
      {text}
    </Link>
  );
};

const Navbar = () => {
  const [navigation, SetNavigation] = useState([
    { text: "Home", link: "/", icon: <IoHome /> },
    {
      text: "My Account",
      link: "/dashboard",
      icon: <BsFillPersonLinesFill />,
    },
    { text: "Wishlist", link: "/wishlist", icon: <IoDiamondSharp /> },
    { text: "Cart", link: "/cart", icon: <FaShoppingBag /> },
    { text: "Log out", link: "/logout", icon: <IoPersonRemoveSharp /> },
  ]);

  useEffect(() => {
    if (sessionStorage.getItem("cred") === null) {
      SetNavigation([
        { text: "Home", link: "/", icon: <IoHome /> },
        {
          text: "My Account",
          link: "/dashboard",
          icon: <BsFillPersonLinesFill />,
        },
      ]);
    }
  }, []);

  return (
    <div className="flex p-5 flex-wrap items-center justify-evenly">
      <div className="text-[2rem] font-bold px-10">E Store</div>
      <nav className=" p-5 flex flex-wrap justify-between max-w-[800px]">
        {navigation.map((nav) => {
          return (
            <NavItem
              key={nav.text}
              text={nav.text}
              icon={nav.icon}
              link={nav.link}
            />
          );
        })}
      </nav>
    </div>
  );
};

export default Navbar;
