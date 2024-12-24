import { IconButton, Tooltip, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import {
  HiBookmark,
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronLeft,
  HiChevronRight,
  HiInformationCircle,
  HiMinus,
  HiPlus,
} from "react-icons/hi";
import { TbSunMoon } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import ReaderRenderer, {
  ReaderProps,
} from "../components/Reader/ReaderRenderer";
type StringNumberObject = { [key: string]: number };
type IntParams = {
  id: number;
  vl: number;
  pg: number;
};
// Interface/StringNumberObject Type: Defines a type where keys are strings and values are numbers.
// Example Object: Demonstrates creating an object that adheres to this type.
// Function to Parse Values: parseAllFields function converts all string values to numbers.
function parseAllFields(obj: { [key: string]: string }): StringNumberObject {
  const parsedObj: StringNumberObject = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      parsedObj[key] = parseInt(obj[key], 10);
    }
  }
  return parsedObj;
}
function NavigationBar({
  bookId,
  volumeNth,
  pagePage,
  lastVolume,
  lastPage,
  nextVolume,
  nextPage,
}: ReaderProps & {
  lastVolume: () => void;
  lastPage: () => void;
  nextPage: () => void;
  nextVolume: () => void;
}) {
  if (!bookId || !volumeNth || !pagePage) {
    return <>Url malfunction.</>;
  }
  return (
    <div className="grid grid-cols-3 w-full h-16">
      <div className="flex flex-row gap-4 place-items-center justify-start">
        <Tooltip content="Dark mode">
          <IconButton
            color="deep-orange"
            size="lg"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <TbSunMoon className="w-6 h-6"></TbSunMoon>
          </IconButton>
        </Tooltip>
        <Tooltip content="Bookmark">
          <IconButton
            color="deep-orange"
            size="lg"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <HiBookmark className="w-6 h-6"></HiBookmark>
          </IconButton>
        </Tooltip>
        <Tooltip content="Why are you here">
          <IconButton
            color="deep-orange"
            size="lg"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <HiInformationCircle className="w-6 h-6"></HiInformationCircle>
          </IconButton>
        </Tooltip>
      </div>
      <div className="flex flex-row gap-4 place-items-center justify-center">
        <Tooltip content="Last volume">
          <IconButton
            color="deep-orange"
            size="lg"
            onClick={() => lastVolume()}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <HiChevronDoubleLeft className="w-6 h-6"></HiChevronDoubleLeft>
          </IconButton>
        </Tooltip>
        <Tooltip content="Last page">
          <IconButton
            color="deep-orange"
            size="lg"
            onClick={() => lastPage()}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <HiChevronLeft className="w-6 h-6"></HiChevronLeft>
          </IconButton>
        </Tooltip>
        <Tooltip content="Next page">
          <IconButton
            color="deep-orange"
            size="lg"
            onClick={() => nextPage()}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <HiChevronRight className="w-6 h-6"></HiChevronRight>
          </IconButton>
        </Tooltip>
        <Tooltip content="Next volume">
          <IconButton
            color="deep-orange"
            size="lg"
            onClick={() => nextVolume()}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <HiChevronDoubleRight className="w-6 h-6"></HiChevronDoubleRight>
          </IconButton>
        </Tooltip>
      </div>
      <div className="flex flex-row gap-4 place-items-center justify-end">
        <Tooltip content="Decrease font size">
          <IconButton
            color="deep-orange"
            size="lg"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <HiMinus className="w-6 h-6"></HiMinus>
          </IconButton>
        </Tooltip>
        <Tooltip content="Increase font size">
          <IconButton
            color="deep-orange"
            size="lg"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <HiPlus className="w-6 h-6"></HiPlus>
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}

export default function ReaderPage() {
  const navigate = useNavigate();
  const params = useParams<{ id: string; vl: string; pg: string }>();
  const [intParams, setIntParams] = useState<IntParams>(
    parseAllFields(params) as IntParams
  );
  const { id, vl, pg } = intParams;
  // Update state when params change
  useEffect(
    () => setIntParams(parseAllFields(params) as IntParams),
    [params, id, vl, pg]
  );
  const lastVolume = () => {
    const newVl = Math.max(1, vl - 1);
    navigate(`/book/${id}/${newVl}/${1}`, { replace: true });
    setIntParams({ id: id, vl: newVl, pg: 1 });
  };

  const nextVolume = () => {
    const newVl = vl + 1;
    navigate(`/book/${id}/${newVl}/${1}`, { replace: true });
    setIntParams({ id: id, vl: newVl, pg: 1 });
  };

  const lastPage = () => {
    const newPg = Math.max(1, pg - 1);
    navigate(`/book/${id}/${vl}/${newPg}`, { replace: true });
    setIntParams({ id: id, vl: vl, pg: newPg });
  };

  const nextPage = () => {
    const newPg = pg + 1;
    navigate(`/book/${id}/${vl}/${newPg}`, { replace: true });
    setIntParams({ id: id, vl: vl, pg: newPg });
  };

  if (!id || !vl || !pg) {
    return <>Url malfunction.</>;
  }
  return (
    <>
      <NavigationBar
        bookId={id}
        volumeNth={vl}
        pagePage={pg}
        lastVolume={() => lastVolume()}
        lastPage={() => lastPage()}
        nextPage={() => nextPage()}
        nextVolume={() => nextVolume()}
      />
      <ReaderRenderer bookId={id} volumeNth={vl} pagePage={pg} />
      <NavigationBar
        bookId={id}
        volumeNth={vl}
        pagePage={pg}
        lastVolume={() => lastVolume()}
        lastPage={() => lastPage()}
        nextPage={() => nextPage()}
        nextVolume={() => nextVolume()}
      />
      <Typography
        variant="h6"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        (bi anh huong style do o nhiem css tu file doc vao, can fix)
      </Typography>
      <Typography
        variant="h5"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        ^ (da fix) ko con bi anh huong do da xai dompurify de loc sach
      </Typography>
    </>
  );
}
