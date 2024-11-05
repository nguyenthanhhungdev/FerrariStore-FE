import { Navbar, Typography, IconButton, Card } from "@material-tailwind/react";
import { HiMenu, HiSearch, HiUser } from "react-icons/hi";
import { useState } from "react";
import { DrawerDefault } from "./DrawerDefault.tsx";
import SearchBar from "./SearchBar.tsx";
import OverlayComponent from "../Share/OverlayComponent.tsx";
import CardPricing from "../Card/CardPricing.tsx";

interface NavBarProps {
  isMobile: boolean;
}

const NavBar = ({ isMobile }: NavBarProps) => {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false); // State for toggling SearchBar
  const [openPricing, setOpenPricing] = useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <>
      <Navbar
        variant="gradient"
        color="transparent"
        className="navbar mx-auto max-w-full w-full from-blue-gray-900 to-blue-gray-800 px-4 py-3"
      >
        <div className="icon-bar flex flex-wrap items-center justify-between gap-y-4 text-white">
          <div className="flex items-center">
            <IconButton className="ml-2" onClick={openDrawer}>
              <HiMenu className="w-6 h-6 text-white" />
            </IconButton>
            <Typography
              as="a"
              href="/"
              variant="h6"
              className="mr-4 ml-2 cursor-pointer py-1.5 text-white text-3xl"
            >
              TH Ebook
            </Typography>
            <Typography
              as="li"
              variant="lead"
              color="white"
              className="p-1 font-normal"
              onClick={() => {
                setOpenPricing(true);
              }}
            >
              <a href="#" className="flex items-center">
                Pricing
              </a>
            </Typography>
          </div>
          <div className="flex items-center">
            {isMobile ? (
              <IconButton className="ml-2" onClick={() => setSearchOpen(true)}>
                <HiSearch className="w-6 h-6 text-white" />
              </IconButton>
            ) : (
              <SearchBar />
            )}
            <IconButton className="ml-2">
              <HiUser className="w-6 h-6 text-white" />
            </IconButton>
          </div>
        </div>
      </Navbar>

      <DrawerDefault open={open} onClose={closeDrawer} />

      {searchOpen && (
        <OverlayComponent
          onClose={() => setSearchOpen(false)}
          BarComponent={<SearchBar />}
        />
      )}

      {openPricing && (
        <OverlayComponent
          onClose={() => setOpenPricing(false)}
          BarComponent={<CardPricing />}
        />
      )}
    </>
  );
};

export default NavBar;
