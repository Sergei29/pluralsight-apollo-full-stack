import React, { memo, Fragment } from "react";
import { Days } from "../types";

type Props = {
  arrDays: Days[];
  handleChangeDay: (strDay: Days) => () => void;
};

const SessionFilterDays: React.FC<Props> = ({ arrDays, handleChangeDay }) => {
  return (
    <Fragment>
      {arrDays.map((strDay) => (
        <button
          type="button"
          onClick={handleChangeDay(strDay)}
          className="btn-oval"
          key={strDay}
        >
          {strDay === Days.All ? "All Sessions" : strDay}
        </button>
      ))}
    </Fragment>
  );
};

export default memo(SessionFilterDays);
