import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import React from "react";

interface Props {
  ComponentHeader: React.ReactNode;
  ComponentBody: React.ReactNode;
  ComponentFooter?: React.ReactNode;
}

function CardDefault({ ComponentHeader, ComponentBody, ComponentFooter }: Props) {
  return (
    <Card className="mt-6 w-96">
      <CardHeader color="blue-gray" className="relative h-56">
        {ComponentHeader}
      </CardHeader>
      <CardBody>{ComponentBody}</CardBody>
      {ComponentFooter && <CardFooter className="pt-0">{ComponentFooter}</CardFooter>}
    </Card>
  );
}

export default CardDefault;
