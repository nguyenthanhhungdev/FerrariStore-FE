import { Button, IconButton } from "@material-tailwind/react";
import { HiArrowUp, HiBookOpen, HiDotsVertical, HiFlag } from "react-icons/hi";
import MenuDefault from "../Share/MenuDefault";

interface Props {
  onAddToLibrary: () => void;
  onPreview: () => void;
  onPreoder: () => void;
  onSub: () => void;
  onRead: () => void;
  onFlag: () => void;
  isMobile: boolean;
}

const ButtonGroupContainer = ({
  onAddToLibrary,
  onSub,
  onPreview,
  onPreoder,
  onRead,
  onFlag,
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
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
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
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Preorder
        </Button>
      ),
      onClick: () => onPreoder(),
    },
    {
      node: (
        <Button
          variant="filled"
          onClick={onSub}
          size="lg"
          color="deep-orange"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
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
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Add To Library
          </Button>
          <IconButton
            color="light-blue"
            size="lg"
            onClick={() => onRead()}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <HiBookOpen />
          </IconButton>
          <IconButton
            color="purple"
            size="lg"
            onClick={() => onFlag()}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <HiFlag />
          </IconButton>
          <IconButton
            color="light-blue"
            size="lg"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <HiArrowUp />
          </IconButton>
        </div>

        <div className="flex gap-2">
          {isMobile ? (
            <>
              <MenuDefault
                handlerButton={
                  <IconButton
                    color="light-blue"
                    size="lg"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
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
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Subscribe
              </Button>
              <Button
                variant="filled"
                onClick={onPreview}
                size="lg"
                color="deep-orange"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Preview
              </Button>
              <Button
                variant="filled"
                onClick={onPreoder}
                size="lg"
                color="deep-orange"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
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
