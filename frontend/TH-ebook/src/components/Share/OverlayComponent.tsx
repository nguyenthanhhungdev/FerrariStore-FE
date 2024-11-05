import {Button, IconButton } from "@material-tailwind/react";
import {HiX} from "react-icons/hi"
import React from "react";

interface OverlayProps {
  onClose: () => void;
  BarComponent: React.ReactNode;
}

const OverlayComponent = ({ onClose, BarComponent }: OverlayProps) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center bg-black bg-opacity-50">
      <div className="absolute top-0 left-0 w-full h-full backdrop-blur-md"></div>
      <div className="relative z-10 w-full p-4">
        {BarComponent}
        <button
          onClick={onClose}
          className="absolute text-2xl top-4 right-4"
          variant="gradient"
          color="deep-orange"
        >
          <HiX />
        </button>
      </div>
    </div>
  );
};

export default OverlayComponent;