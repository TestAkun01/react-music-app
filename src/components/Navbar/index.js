"use client";
import { useState } from "react";
import Search from "@/components/Navbar/InputSearch";
import LinkNavbar from "@/components/Navbar/LinkNavbar";
import Logo from "@/components/Navbar/Logo";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import UserActionButton from "./UserActionButton";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-900 fixed w-full z-50">
      <div className="px-8">
        <div className="relative flex h-16 items-center md:justify-between justify-center">
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white"
              aria-controls="mobile-menu"
              aria-expanded={isOpen ? "true" : "false"}
              onClick={toggleNavbar}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <MenuRoundedIcon className="block h-6 w-6" />
            </button>
          </div>
          <div className="flex items-center justify-center md:items-stretch md:justify-start">
            <Logo></Logo>
            <div className="hidden sm:ml-6 md:block my-auto">
              <div className="flex space-x-4">
                <LinkNavbar></LinkNavbar>
              </div>
            </div>
          </div>
          <div className="md:flex hidden gap-8 justify-center items-center w-auto">
            <Search></Search>
            <div className="flex-shrink-0">
              <UserActionButton></UserActionButton>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden ${isOpen ? "block" : "hidden"}`}
        id="mobile-menu"
      >
        <div className="flex px-2 pb-3 pt-2">
          <Search></Search>
        </div>
        <div className="flex-shrink-0">
          <UserActionButton></UserActionButton>
        </div>
        <div className="flex flex-col space-y-1 px-2 pb-3 pt-2">
          <LinkNavbar></LinkNavbar>
        </div>
      </div>
    </nav>
  );
}
