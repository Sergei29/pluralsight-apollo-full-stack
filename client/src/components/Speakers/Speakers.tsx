import React from "react";
import SpeakerList from "./components/SpeakerList";

const Speakers: React.FC = () => {
  return (
    <div className="container">
      <div className="row">
        <SpeakerList />
      </div>
    </div>
  );
};

export default Speakers;
