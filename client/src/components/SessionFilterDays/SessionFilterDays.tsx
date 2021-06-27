import React, { memo } from "react";

type Props = {
  arrDays: string[];
  handleChangeDay: (strDay: string) => () => void;
};
const SessionFilterDays: React.FC<Props> = ({ arrDays, handleChangeDay }) => {
  return (
    <>
      {arrDays.map((strDay) => (
        <button
          type="button"
          onClick={handleChangeDay(strDay)}
          className="btn-oval"
        >
          {strDay === "All" ? "All Sessions" : strDay}
        </button>
      ))}
    </>
  );
};

export default memo(SessionFilterDays);
