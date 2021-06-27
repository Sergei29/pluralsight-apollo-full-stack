import React, { memo } from "react";
import { Link } from "react-router-dom";

type Props = { children: React.ReactNode; to: string };

const HeroLinkButton: React.FC<Props> = ({ children, to }) => {
  return (
    <h1>
      <Link
        style={{
          border: "solid 1px white",
          borderRadius: 20,
          padding: 20,
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#0D1424",
        }}
        to={to}
      >
        {children}
      </Link>
    </h1>
  );
};

export default memo(HeroLinkButton);
