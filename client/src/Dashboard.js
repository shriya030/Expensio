import React, { useEffect, useRef } from "react";
import { Grid, Button } from "@material-ui/core";
import CurrencySelector from "./components/CurrencySelector";
import { Link } from "react-router-dom";
import "./Dashboard.css";

//importing the logout button
import { useAuth } from "./context/AuthContext";

import { SpeechState, useSpeechContext } from "@speechly/react-client";
import {
  PushToTalkButton,
  PushToTalkButtonContainer
} from "@speechly/react-ui";

import Details from "./components/Details/Details";
import Main from "./components/Main/Main";
import useStyles from "./styles";

function Dashboard() {
  const classes = useStyles();
  const { speechState } = useSpeechContext();
  const main = useRef(null);

  const executeScroll = () => main.current.scrollIntoView();

  useEffect(() => {
    if (speechState === SpeechState.Recording) {
      executeScroll();
    }
  }, [speechState]);

  const { logout } = useAuth();

  return (
    <div className="dashboard">
      <div class="context">
        <div class="headers">
          <CurrencySelector />
          <div className="buttons">
            <Button
              variant="contained"
              color="secondary"
              className="update-btn"
            >
              <Link to="/update-profile">Update Profile</Link>
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className="logout-btn"
              onClick={logout}
            >
              Log Out
            </Button>
          </div>
        </div>
        <Grid
          className={classes.grid}
          container
          spacing={0}
          alignItems="center"
          justify="center"
          style={{ height: "100vh" }}
        >
          <Grid item xs={12} sm={4} className={classes.mobile}>
            <Details title="Income" />
          </Grid>
          <Grid ref={main} item xs={12} sm={3} className={classes.main}>
            <Main />
          </Grid>
          <Grid item xs={12} sm={4} className={classes.desktop}>
            <Details title="Income" />
          </Grid>
          <Grid item xs={12} sm={4} className={classes.last}>
            <Details title="Expense" />
          </Grid>
          <PushToTalkButtonContainer>
            <PushToTalkButton />
          </PushToTalkButtonContainer>
        </Grid>
      </div>

      <div class="area">
        <ul class="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
