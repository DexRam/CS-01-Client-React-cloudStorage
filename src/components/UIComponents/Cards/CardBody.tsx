import { FC } from "react";

interface CardBodyProps {
  text: string;
}

const CardBody: FC<CardBodyProps> = ({ text }) => (
  <p className="text-gray-700">{text}</p>
);

export default CardBody;
