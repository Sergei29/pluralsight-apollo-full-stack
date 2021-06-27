import React from "react";
import "./speaker-summary.css";

type Props = {
  children: React.ReactNode;
};

type HeaderProps = { name: string };
type BioProps = { bio: string };
type SessonsProps = { sessions: Record<string, any>[]; featured: boolean };

const Header = ({ name }: HeaderProps) => (
  <div className="panel-heading">
    <h3 className="panel-title">{`Speaker: ${name}`}</h3>
  </div>
);

const Bio = ({ bio }: BioProps) => (
  <div className="panel-body speakerItem__body">
    <h5>{`Bio: ${bio}`}</h5>
  </div>
);

const Sessions = ({ sessions, featured }: SessonsProps) => (
  <div className="panel-footer speakerItem__footer">
    <h4>Sessions</h4>
    {sessions?.map((objSession) => (
      <p key={objSession.id} style={{ padding: 2 }}>
        {objSession.title}
      </p>
    ))}
    <span>
      <button
        type="button"
        className="btn btn-default btn-lg"
        onClick={() => {
          /* ---> Call useMutation's mutate function to mark speaker as featured */
        }}
      >
        <i
          className={`fa ${featured ? "fa-star" : "fa-star-o"}`}
          aria-hidden="true"
          style={{
            color: featured ? "gold" : undefined,
          }}
        ></i>{" "}
        Featured Speaker
      </button>
    </span>
  </div>
);

const SpeakerSummary = ({ children }: Props) => {
  return (
    <div className="col-xs-12 col-sm-6 col-md-6" style={{ padding: 5 }}>
      <div className="panel panel-default speakerItem">{children}</div>
    </div>
  );
};

SpeakerSummary.Header = Header;
SpeakerSummary.Bio = Bio;
SpeakerSummary.Sessions = Sessions;

export default SpeakerSummary;
