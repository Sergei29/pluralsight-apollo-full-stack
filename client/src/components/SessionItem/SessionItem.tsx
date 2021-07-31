import React, { useContext } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { TOGGLE_FAVORITE_SESSION } from "../../graphql/mutations";
import { SESSIONS } from "../../graphql/queries";
import { AuthContext } from "../../graphql/AuthProvider";
import { SessionType } from "../types";
import "./session-item.css";

type Props = {
  objSession: SessionType;
  favorite: boolean;
};

const SessionItem: React.FC<Props> = ({ objSession, favorite }) => {
  const {
    title,
    day,
    room,
    level,
    startsAt,
    speakers,
    description,
    favoriteCount = 0,
  } = objSession;
  const [toggleFavorite] = useMutation(TOGGLE_FAVORITE_SESSION);
  const { isAuthenticated } = useContext(AuthContext);

  const markFavorite = async () =>
    await toggleFavorite({
      variables: { sessionId: objSession.id },
    });

  return (
    <div className="col-xs-12 col-sm-6" style={{ padding: 5 }}>
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">{title}</h3>
          <h5>{`Level: ${level}`}</h5>
        </div>
        <div className="panel-body">
          <h5>{day}</h5>
          <h5>{`Room Number: ${room}`}</h5>
          <h5>{`Starts at: ${startsAt}`}</h5>
          {description && (
            <details className="sessionItem__description">
              <summary>
                <h5 title="description">Description</h5>
              </summary>
              {description}
            </details>
          )}
        </div>
        <div className="panel-footer">
          {true === isAuthenticated() && (
            <span style={{ padding: 2 }}>
              <button
                type="button"
                className="btn btn-default btn-lg"
                onClick={markFavorite}
              >
                <i
                  className={`fa ${favorite ? "fa-star" : "fa-star-o"}`}
                  aria-hidden="true"
                  style={{
                    color: favorite ? "gold" : undefined,
                  }}
                ></i>{" "}
                Favorite {` (${favoriteCount})`}
              </button>
            </span>
          )}
          {speakers &&
            speakers.map(({ id, name }) => (
              <Link
                key={id}
                to={`/conference/speaker/${id}`}
                className="btn btn-default btn-lg"
              >
                {`View ${name}'s profile`}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SessionItem;
