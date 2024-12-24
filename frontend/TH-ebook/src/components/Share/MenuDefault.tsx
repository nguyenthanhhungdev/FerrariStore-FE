import React from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";

interface MenuProps {
  handlerButton: React.ReactNode;
  menuItems: { node: React.ReactNode; onClick: () => void }[];
}

const MenuDefault = ({
  handlerButton,
  menuItems,
}: MenuProps) => {
  return (
    <Menu
      animate={{
        mount: { y: 0 },
        unmount: { y: 25 },
      }}
    >
      <MenuHandler>{handlerButton}</MenuHandler>
      <MenuList className="flex flex-col gap-y-3 bg-transparent">
        {menuItems.map((item, index) => (
          <MenuItem key={index} onClick={item.onClick}>
            {item.node}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default MenuDefault;