import React, { Fragment } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Sessions from "../../components/Sessions";
import AddSession from "../../components/AddSession";
import Speakers from "../../components/Speakers";
import Speaker from "../../components/Speaker";
import HeroLinkButton from "../../components/HeroLinkButton";
import "./style-sessions.css";

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
        <Route path={`${path}/speaker/:speaker_id`}>{/* <Speaker /> */}</Route>
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
