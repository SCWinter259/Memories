import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Container } from "@material-ui/core";
import { Home } from "./components/Home/Home";
import { Auth } from "./components/Auth/Auth";
import { NavBar } from "./components/NavBar/NavBar";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { PostDetails } from "./components/PostDetails/PostDetails";
import { getUser } from "./utils/UtilFunctions";

const App = () => {
  const user = getUser();
  
  return (
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}>
      <BrowserRouter>
        <Container maxWidth="xl">
          <NavBar />
          <Switch>
            <Route path="/" exact component={() => <Redirect to="/posts" />} />
            <Route path="/posts" exact component={Home} />
            <Route path="/posts/search" exact component={Home} />
            <Route path="/posts/:id" exact component={PostDetails} />
            <Route
              path="/auth"
              exact
              component={() => (!user?.token ? <Auth /> : <Redirect to="/posts" />)}
            />
          </Switch>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
