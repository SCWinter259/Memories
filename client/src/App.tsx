import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Container } from "@material-ui/core";
import { Home } from "./components/Home/Home";
import { Auth } from "./components/Auth/Auth";
import { NavBar } from "./components/NavBar/NavBar";
import "./index.css";

const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth" exact component={Auth} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
