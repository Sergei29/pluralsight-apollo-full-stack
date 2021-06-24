import React from "react";
import { useParams } from "react-router-dom";
import SpeakerDetails from "./components/SpeakerDetails";
import { SpeakerType } from "../types";

const Speaker: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="container">
      <div className="row">
        {/* <SpeakerDetails objSpeaker={objSpeaker} /> */}
      </div>
    </div>
  );
};

export default Speaker;
