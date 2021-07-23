import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { AuthContext } from "./graphql/AuthProvider";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Media } from "./pages/media/Media";
import { OurStory } from "./pages/OurStory/OurStory";
import { Robotics } from "./pages/robotics/Robotics";
import { Conference } from "./pages/conference/Conference";
import { Home } from "./pages/home/Home";
import Auth from "./pages/auth/Auth";
import Admin from "./pages/admin";
import useAppInit from "./hooks/useAppInit";

const App: React.FC = () => {
  const { loading } = useAppInit();
  const { isAdmin } = useContext(AuthContext);
  return (
    <div id="wrapper">
      <Header />
      {loading ? (
        <p>loading user info...</p>
      ) : (
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/media">
            <Media />
          </Route>
          <Route path="/our-story">
            <OurStory />
          </Route>
          <Route path="/robotics">
            <Robotics />
          </Route>
          <Route path="/conference">
            <Conference />
          </Route>
          {isAdmin() && (
            <Route path="/admin">
              <Admin />
            </Route>
          )}
          <Route path="/auth">
            <Auth />
          </Route>
        </Switch>
      )}
      <Footer />
    </div>
  );
};

export default App;
