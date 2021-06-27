import React, { memo, Fragment } from "react";

type Props = {
  arrDays: string[];
  handleChangeDay: (strDay: string) => () => void;
};

const SessionFilterDays: React.FC<Props> = ({ arrDays, handleChangeDay }) => {
  return (
    <Fragment>
      {arrDays.map((strDay) => (
        <button
          type="button"
          onClick={handleChangeDay(strDay)}
          className="btn-oval"
        >
          {strDay === "All" ? "All Sessions" : strDay}
        </button>
      ))}
    </Fragment>
  );
};

export default memo(SessionFilterDays);
