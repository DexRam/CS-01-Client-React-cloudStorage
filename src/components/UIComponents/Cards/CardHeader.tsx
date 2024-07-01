import { FC } from "react";

interface CardHeaderProps {
  title: string;
}

const CardHeader: FC<CardHeaderProps> = ({ title }) => (
  <h2 className="text-3xl font-bold mb-4 text-blue-800">{title}</h2>
);

export default CardHeader;
