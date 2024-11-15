import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@material-tailwind/react";
import React, { useEffect } from "react";

interface Props {
  ComponentHeader: React.ReactNode;
  ComponentBody: React.ReactNode[];
  ComponentFooter?: React.ReactNode[];
  imageUrl?: string;
}

function CardDefault({
  ComponentHeader,
  ComponentBody,
  ComponentFooter,
  imageUrl,
}: Props) {
  useEffect(() => {
    if (!imageUrl) return;

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;
  }, [imageUrl]);

  return (
    <>
      <div className="card relative">
        <Card className="mt-6 w-96" variant="gradient" color="transparent">
          <CardHeader className="relative xxlg:h-56 xlg:h -50 lg:h-45 md:h-40 sm:h-30 ">
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
