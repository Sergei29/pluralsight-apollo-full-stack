import React from "react";
import { useQuery } from "@apollo/client";
import { SPEAKERS } from "../../../../graphql/queries";
import { SpeakerType } from "../../../types";
import SpeakerDetails from "../../../Speaker/components/SpeakerDetails";

type ResponseDataType = {
  speakers: SpeakerType[];
};

const SpeakerList: React.FC = () => {
  /* ---> Replace hardcoded speaker values with data that you get back from GraphQL server here */
  const featured = false;

  const { loading, error, data } = useQuery<ResponseDataType>(SPEAKERS);

  if (loading) return <p>Loading Speakers...</p>;
  if (error) return <p>Error loading speakers!</p>;

  return (
    <>
      {data?.speakers.map(({ id, bio, name, sessions }) => (
        <div
          key={id}
          className="col-xs-12 col-sm-6 col-md-6"
          style={{ padding: 5 }}
        >
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">{`Speaker: ${name}`}</h3>
            </div>
            <div className="panel-body">
              <h5>{`Bio: ${bio}`}</h5>
            </div>
            <div className="panel-footer">
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
          </div>
        </div>
      ))}
    </>
  );
};

export default SpeakerList;
