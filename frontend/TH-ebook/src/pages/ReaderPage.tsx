import { IconButton } from "@material-tailwind/react";
import { useEffect } from "react";
import {
  HiChevronLeft,
  HiChevronDoubleLeft,
  HiChevronRight,
  HiChevronDoubleRight,
  HiPlus,
  HiMinus,
  HiInformationCircle,
  HiBookmark,
} from "react-icons/hi";
import { TbSunMoon } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";

export default function ReaderPage() {
  const navigate = useNavigate();
  const params = useParams<{ id: string; pg: string }>();
  useEffect(() => {
    if (!params.pg) {
      navigate(`/reader/${params.id}/${1}`, {
        replace: true,
      });
    }
  }, [navigate, params.pg, params.id]);

  return (
    <div className="grid grid-cols-3 w-full h-16">
      <div className="flex flex-row gap-4 place-items-center justify-start">
        <IconButton color="deep-orange" size="lg" aria-label="mmb">
          <TbSunMoon className="w-6 h-6"></TbSunMoon>
        </IconButton>
        <IconButton color="deep-orange" size="lg">
          <HiBookmark className="w-6 h-6"></HiBookmark>
        </IconButton>
        <IconButton color="deep-orange" size="lg">
          <HiInformationCircle className="w-6 h-6"></HiInformationCircle>
        </IconButton>
      </div>
      <div className="flex flex-row gap-4 place-items-center justify-center">
        <IconButton color="deep-orange" size="lg">
          <HiChevronDoubleLeft className="w-6 h-6"></HiChevronDoubleLeft>
        </IconButton>
        <IconButton color="deep-orange" size="lg">
          <HiChevronLeft className="w-6 h-6"></HiChevronLeft>
        </IconButton>
        <IconButton color="deep-orange" size="lg">
          <HiChevronRight className="w-6 h-6"></HiChevronRight>
        </IconButton>
        <IconButton color="deep-orange" size="lg">
          <HiChevronDoubleRight className="w-6 h-6"></HiChevronDoubleRight>
        </IconButton>
      </div>
      <div className="flex flex-row gap-4 place-items-center justify-end">
        <IconButton color="deep-orange" size="lg">
          <HiMinus className="w-6 h-6"></HiMinus>
        </IconButton>
        <IconButton color="deep-orange" size="lg">
          <HiPlus className="w-6 h-6"></HiPlus>
        </IconButton>
      </div>
    </div>
  );
}
