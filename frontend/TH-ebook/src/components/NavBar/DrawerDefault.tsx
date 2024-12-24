import React from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";

import { HiHome, HiX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

interface DrawerDefaultProps {
  open: boolean;
  onClose: () => void;
}

export function DrawerDefault({ open, onClose }: DrawerDefaultProps) {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
    onClose();
  };
  return (
    <React.Fragment>
      <Drawer open={open} onClose={onClose} className="p-4">
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Th Ebook
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={onClose}>
            <HiX size={24} />
          </IconButton>
        </div>
        <div className="flex flex-col gap-4">
          <Button variant="gradient" color="deep-orange" onClick={() => handleHomeClick()}>
            <div className="flex items-center gap-x-3">
              <IconButton color="gray" size="lg">
                <HiHome className="text-white" />
              </IconButton>
              <Typography variant="h4" color="black">
                Home
              </Typography>
            </div>
          </Button>
        </div>
      </Drawer>
    </React.Fragment>
  );
}
