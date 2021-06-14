import React, { Fragment } from "react";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import { Sessions, AddSession } from "./Sessions";
import { Speakers, Speaker } from "./Speakers";
import "./style-sessions.css";

type Props = { children: React.ReactNode; to: string };
const HeroLinkButton: React.FC<Props> = ({ children, to }) => {
  return (
    <h1>
      <Link
        style={{
          border: "solid 1px white",
          borderRadius: 20,
          padding: 20,
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#0D1424",
        }}
        to={to}
      >
        {children}
      </Link>
    </h1>
  );
};

export const Conference: React.FC = () => {
  const { path, url } = useRouteMatch();

  return (
    <Fragment>
      <Switch>
        <Route path={`${path}/sessions/new`}>
          <AddSession />
        </Route>
        <Route path={`${path}/sessions`}>
          <Sessions />
        </Route>
        <Route path={`${path}/speakers`}>
          <Speakers />
        </Route>
        <Route path={`${path}/speaker/:speaker_id`}>
          <Speaker />
        </Route>
        <Route path={`${path}`}>
          <section className="banner">
            <img src="images/banner3.png" alt="" />
            <div className="inner-content col-md-12">
              <div className="container jumboContainer">
                <div className="col-md-8 middle">
                  <HeroLinkButton to={`${url}/speakers`}>
                    View Speakers
                  </HeroLinkButton>
                  <HeroLinkButton to={`${url}/sessions`}>
                    View Sessions
                  </HeroLinkButton>
                </div>
              </div>
            </div>
          </section>
        </Route>
      </Switch>
    </Fragment>
  );
};
