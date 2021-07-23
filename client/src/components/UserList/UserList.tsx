import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { USERS } from "../../graphql/queries";
import { MARK_SPEAKER_FEATURED } from "../../graphql/mutations";
import { UserType } from "../types";

const UserList = () => {
  const { loading, error, data } = useQuery<{ users: UserType[] }>(USERS);
  const [markFeatured] = useMutation(MARK_SPEAKER_FEATURED);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error !</p>;

  if (!data?.users) {
    return <p>No users to show.</p>;
  }
  return (
    <div>
      {data.users.map(({ id, email, favorites, speaker }) => (
        <div
          key={id}
          className="col-xs-12 col-sm-6 col-md-6"
          style={{ padding: 5 }}
        >
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">{email}</h3>
            </div>
            {speaker ? (
              <div className="panel-body">
                <label key={speaker.id}>
                  <input
                    type="checkbox"
                    checked={speaker.featured}
                    onChange={() => {
                      markFeatured({
                        variables: {
                          speakerId: speaker.id,
                          featured: !speaker.featured,
                        },
                      });
                    }}
                  />{" "}
                  {speaker.name} Featured Speaker?
                </label>
              </div>
            ) : null}
            <div className="panel-footer">
              {favorites &&
                favorites.map((session) => (
                  <span key={session.id} style={{ padding: 2 }}>
                    <Link
                      className="btn btn-default btn-lg"
                      to={`/conference/sessions/${session.id}`}
                    >
                      View "{session.title}"
                    </Link>
                  </span>
                ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
