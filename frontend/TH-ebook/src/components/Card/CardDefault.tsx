import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import ColorThief from "colorthief";

interface Props {
  ComponentHeader: React.ReactNode;
  ComponentBody: React.ReactNode[];
  ComponentFooter?: React.ReactNode[];
  imageUrl?: string;
}

function CardDefault({ ComponentHeader, ComponentBody, ComponentFooter, imageUrl }: Props) {
  const [shadowColor, setShadowColor] = useState<string>("rgba(0, 0, 0, 0.5)");

  useEffect(() => {
    if (!imageUrl) return;

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;
    img.onload = () => {
      const colorThief = new ColorThief();
      const result = colorThief.getColor(img);
      setShadowColor(`rgba(${result[0]}, ${result[1]}, ${result[2]}, 0.5)`);
    };
  }, [imageUrl]);

  return (
    <>
    <div className="card relative">
    <Card className="mt-6 w-96" shadow={true} style={{ boxShadow: `0 4px 8px ${shadowColor}` }} variant="gradient" color="transparent">
      <CardHeader className="relative xxlg:h-56 xlg:h-50 lg:h-45 md:h-40 sm:h-30 " style={{ backgroundColor: shadowColor }}>
        {ComponentHeader}
      </CardHeader>
      <CardBody>
        {ComponentBody.map((node, index) => (
          <React.Fragment key={index}>{node}</React.Fragment>
        ))}
      </CardBody>
      {ComponentFooter && (
        <CardFooter className="pt-0">
          {ComponentFooter.map((node, index) => (
            <React.Fragment key={index}>{node}</React.Fragment>
          ))}
        </CardFooter>
      )}
    </Card>
    </div>
    </>
  );
}

export default CardDefault;
