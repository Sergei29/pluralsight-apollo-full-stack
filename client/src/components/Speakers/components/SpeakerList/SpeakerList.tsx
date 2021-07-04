import React, { Fragment } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { SPEAKERS } from "../../../../graphql/queries";
import { MARK_SPEAKER_FEATURED } from "../../../../graphql/mutations";
import { SpeakerType } from "../../../types";
import SpeakerSummary from "../SpeakerSummary";

type ResponseDataType = {
  speakers: SpeakerType[];
};

const SpeakerList: React.FC = () => {
  const { loading, error, data } = useQuery<ResponseDataType>(SPEAKERS);
  const [markFeatured, { loading: markLoading }] = useMutation(
    MARK_SPEAKER_FEATURED
  );

  const handleMarkFeatured =
    (speakerId: string, featured: boolean) => async () => {
      await markFeatured({ variables: { speakerId, featured } });
    };

  if (loading) return <p>Loading Speakers...</p>;
  if (error) return <p>Error loading speakers!</p>;

  return (
    <Fragment>
      {data?.speakers.map(({ id, name, bio, sessions, featured }) => (
        <SpeakerSummary key={id}>
          <SpeakerSummary.Header name={name!} />
          <SpeakerSummary.Bio bio={bio!} />
          <SpeakerSummary.Sessions sessions={sessions!}>
            <SpeakerSummary.Sessions.MarkButton
              featured={Boolean(featured)}
              handleMarkFeatured={handleMarkFeatured(id!, !Boolean(featured))}
              bDisableMarkButton={markLoading}
            />
          </SpeakerSummary.Sessions>
        </SpeakerSummary>
      ))}
    </Fragment>
  );
};

export default SpeakerList;
