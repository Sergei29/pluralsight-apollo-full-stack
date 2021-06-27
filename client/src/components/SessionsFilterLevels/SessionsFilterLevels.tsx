import React, { memo } from "react";
import { LevelsStateType, Levels } from "../types";
import "./session-filter-levels.css";

const { intro, intermediate, advanced } = Levels;

type Props = {
  objLevels: LevelsStateType;
  toggleLevel: (strLevel: Levels) => () => void;
};

const SessionsFilterLevels: React.FC<Props> = ({ objLevels, toggleLevel }) => {
  const { bIntro, bIntermediate, bAdvanced } = objLevels;

  return (
    <div
      className="btn-group sessionFilterLevel"
      role="group"
      aria-label="Basic example"
    >
      <button
        type="button"
        className={bIntro ? "btn btn-primary" : "btn btn-outline-primary"}
        onClick={toggleLevel(intro)}
      >
        intro
      </button>
      <button
        type="button"
        className={
          bIntermediate ? "btn btn-primary" : "btn btn-outline-primary"
        }
        onClick={toggleLevel(intermediate)}
      >
        Intermediate
      </button>
      <button
        type="button"
        className={bAdvanced ? "btn btn-primary" : "btn btn-outline-primary"}
        onClick={toggleLevel(advanced)}
      >
        Advanced
      </button>
    </div>
  );
};

export default memo(SessionsFilterLevels);
