import { ClassNames } from "@emotion/react";
import { Button, Grid, TextField, Theme, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    signInButton: {
      background: "#1e9cf1",
      borderRadius: 30,
      width: "50%",
      minWidth: 300,
      height: 50,
    },
    inputField: {
      borderRadius: 30,
      height: 50,
    },
    signUpText: {
      color: "#1e9cf1",
      cursor: "pointer",
    },
  })
);

export enum CurrentTabs {
  signIn = "signIn",
  signUp = "signUp",
}

type CurrentTab = CurrentTabs.signIn | CurrentTabs.signUp;

export default function Home() {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState<CurrentTab>(CurrentTabs.signIn);

  const handleCurrentTab = (tab: CurrentTab) => {
    setCurrentTab(tab);
  };

  return (
    <Box minHeight={500} height="100vh" width="100vw">
      <Grid container>
        <Grid item sm={6} md={6} lg={6}>
          <Box
            width="100%"
            height="100vh"
            minHeight={500}
            position="relative"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Image
              src="/static/images/twitter-logo.png"
              sizes="100%"
              width="100%"
              alt="Twitter Logo"
              layout="fill"
              objectFit="contain"
            />
          </Box>
        </Grid>
        <Grid item sm={6} md={6} lg={6}>
          <Box
            width="100%"
            height="100vh"
            minHeight={500}
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Box marginBottom={2}>
              <Typography variant="h2" fontWeight={700} marginBottom={5}>
                Happening now
              </Typography>
              <Typography variant="h3" fontWeight={500} fontSize="2rem">
                Join Twitter today.
              </Typography>
            </Box>

            {currentTab === CurrentTabs.signIn && (
              <SignIn handleCurrentTab={handleCurrentTab} />
            )}

            {currentTab === CurrentTabs.signUp && (
              <SignUp handleCurrentTab={handleCurrentTab} />
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
