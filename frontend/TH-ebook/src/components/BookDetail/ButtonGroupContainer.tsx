import { Button, IconButton } from "@material-tailwind/react";
import { HiArrowUp, HiBookOpen, HiFlag, HiDotsVertical } from "react-icons/hi";
import MenuDefault from "../MenuDefault";

interface Props {
  onAddToLibrary: () => void;
  onPreview: () => void;
  onPreoder: () => void;
  onSub: () => void;
  isMobile: boolean;
}

const ButtonGroupContainer = ({
  onAddToLibrary,
  onSub,
  onPreview,
  onPreoder,
  isMobile,
}: Props) => {
  const menuItems = [
    {
      node: (
        <Button
          variant="filled"
          onClick={onPreview}
          size="lg"
          color="deep-orange"
        >
          Preview
        </Button>
      ),
      onClick: () => onPreview(),
    },
    {
      node: (
        <Button
          variant="filled"
          onClick={onPreoder}
          size="lg"
          color="deep-orange"
        >
          Preorder
        </Button>
      ),
      onClick: () => onPreoder(),
    },
    {
      node: (
        <Button variant="filled" onClick={onSub} size="lg" color="deep-orange">
          Sub
        </Button>
      ),
      onClick: () => onSub(),
    },
  ];
  return (
    <>
      <div className="button flex gap-2 sm:mb-0 mb-2 flex-wrap">
        <div className="flex gap-2">
          <Button
            variant="filled"
            onClick={onAddToLibrary}
            size="lg"
            color="deep-orange"
          >
            Add To Library
          </Button>
          <IconButton color="light-blue" size="lg">
            <HiBookOpen />
          </IconButton>
          <IconButton color="light-blue" size="lg">
            <HiFlag />
          </IconButton>
          <IconButton color="light-blue" size="lg">
            <HiArrowUp />
          </IconButton>
        </div>

        <div className="flex gap-2">
          {isMobile ? (
            <>
              <MenuDefault
                handlerButton={
                  <IconButton color="light-blue" size="lg">
                    <HiDotsVertical />
                  </IconButton>
                }
                menuItems={menuItems}
              ></MenuDefault>
            </>
          ) : (
            <>
              <Button
                variant="filled"
                onClick={onSub}
                size="lg"
                color="deep-orange"
              >
                Subscribe
              </Button>
              <Button
                variant="filled"
                onClick={onPreview}
                size="lg"
                color="deep-orange"
              >
                Preview
              </Button>
              <Button
                variant="filled"
                onClick={onPreoder}
                size="lg"
                color="deep-orange"
              >
                Preorder
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ButtonGroupContainer;
