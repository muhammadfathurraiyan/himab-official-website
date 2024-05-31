import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

export default function CardInfo({
  title,
  description,
  button,
}: {
  title: string;
  description: string;
  button: {
    title: string;
    onClick?: () => void;
  };
}) {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button onClick={button.onClick} type="button">
          {button.title}
        </Button>
      </CardFooter>
    </Card>
  );
}
