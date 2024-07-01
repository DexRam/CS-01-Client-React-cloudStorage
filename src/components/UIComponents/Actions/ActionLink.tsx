import { Link } from "react-router-dom";
import { FC, ReactNode } from "react";

interface ActionLinkProps {
  to: string;
  color: string;
  hoverColor: string;
  children: ReactNode;
}

const ActionLink: FC<ActionLinkProps> = ({ to, color, hoverColor, children }) => (
  <Link
    to={to}
    className={`${color} text-white py-2 px-4 mx-1 mt-4 rounded hover:${hoverColor} transition duration-300`}
  >
    {children}
  </Link>
);

export default ActionLink;
