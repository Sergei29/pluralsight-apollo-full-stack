import React from "react";
import { Route, Switch } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_GREETING } from "./graphql/queries";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Media } from "./pages/media/Media";
import { OurStory } from "./pages/our-story/OurStory";
import { Robotics } from "./pages/robotics/Robotics";
import { Conference } from "./pages/conference/Conference";
import { Home } from "./pages/home/Home";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <div id="wrapper">
        <Header />
        <Switch>
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
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Footer />
      </div>
    </div>
  );
};

export default App;
