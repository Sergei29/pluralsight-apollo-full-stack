import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import AllSessionList from "./components/AllSessionList";
import SessionList from "./components/SessionList";
import SessionsFilterLevels from "../SessionsFilterLevels";
import SessionFilterDays from "../SessionFilterDays";
import { LevelsStateType, Levels, Days } from "../types";
import "./style-sessions.css";

const { All, Wednesday, Thursday, Friday } = Days;

const getInitialState = (): LevelsStateType => ({
  bIntro: true,
  bIntermediate: true,
  bAdvanced: true,
});

const Sessions: React.FC = () => {
  const [day, setDay] = useState<Days>(All);
  const [objLevels, setObjLevels] = useState<LevelsStateType>(
    getInitialState()
  );

  const handleChangeDay = useCallback(
    (strDay: Days) => () => setDay(strDay),
    []
  );

  const toggleLevel = useCallback(
    (strLevel: Levels) => () =>
      setObjLevels((prevState) => ({
        ...prevState,
        [strLevel]: !prevState[strLevel],
      })),
    []
  );

  useEffect(() => {
    setObjLevels(getInitialState());
  }, [day]);

  return (
    <section className="banner">
      <div className="container">
        <div className="row" style={{ padding: 10 }}>
          <Link
            className="btn btn-lg center-block"
            to={`/conference/sessions/new`}
          >
            Submit a Session!
          </Link>
        </div>
        <div className="sessionsControls">
          <SessionFilterDays
            arrDays={[All, Wednesday, Thursday, Friday]}
            handleChangeDay={handleChangeDay}
          />
          <SessionsFilterLevels
            objLevels={objLevels}
            toggleLevel={toggleLevel}
          />
        </div>
        {day !== All ? (
          <SessionList day={day} objLevels={objLevels} />
        ) : (
          <AllSessionList objLevels={objLevels} />
        )}
      </div>
    </section>
  );
};

export default Sessions;
