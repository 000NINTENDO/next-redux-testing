import { Button, TextField, Theme, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { makeStyles, createStyles } from "@mui/styles";
import { CurrentTabs } from "..";

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

interface SignUpInterface {
  handleCurrentTab: any;
}

const SignUp = ({ handleCurrentTab }: SignUpInterface) => {
  const classes = useStyles();

  return (
    <Box>
      <Typography
        variant="h2"
        fontSize="1.2rem"
        fontWeight={700}
        marginBottom={2}
      >
        Sign Up
      </Typography>
      <Box marginBottom={2} width="50%" minWidth="300px">
        <TextField variant="outlined" label="First name" fullWidth={true} />
      </Box>
      <Box marginBottom={2} width="50%" minWidth="300px">
        <TextField variant="outlined" label="Last name" fullWidth={true} />
      </Box>
      <Box marginBottom={2} width="50%" minWidth="300px">
        <TextField
          variant="outlined"
          label="Phone, email or username"
          fullWidth={true}
        />
      </Box>
      <Box marginBottom={2} width="50%" minWidth="300px">
        <TextField
          variant="outlined"
          label="Password"
          fullWidth={true}
          className={classes.inputField}
        />
      </Box>
      <Button variant="contained" className={classes.signInButton}>
        Sign Up
      </Button>
      <Box marginTop={2}>
        <Typography component="span">Already have an account?</Typography>
        <Typography
          component="span"
          className={classes.signUpText}
          onClick={() => handleCurrentTab(CurrentTabs.signIn)}
        >
          Sign In
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUp;
