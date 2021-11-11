import React from "react";
import { makeStyles, createStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { Button, TextField, Theme, Typography } from "@mui/material";
import { CurrentTabs } from "../pages";

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

const SignIn = ({ handleCurrentTab }: SignUpInterface) => {
  const classes = useStyles();

  return (
    <Box>
      <Typography
        variant="h2"
        fontSize="1.2rem"
        fontWeight={700}
        marginBottom={2}
      >
        Sign in
      </Typography>
      <Box marginBottom={2} width="50%" minWidth="300px">
        <TextField
          variant="outlined"
          label="Phone, email or username"
          fullWidth={true}
          inputProps={{
            "data-testid": "username",
          }}
        />
      </Box>
      <Box marginBottom={2} width="50%" minWidth="300px">
        <TextField
          variant="outlined"
          label="Password"
          fullWidth={true}
          className={classes.inputField}
          inputProps={{
            "data-testid": "password",
          }}
        />
      </Box>
      <Button variant="contained" className={classes.signInButton}>
        Sign In
      </Button>
      <Box marginTop={2}>
        <Typography component="span">Don’t have an account?</Typography>
        <Typography
          component="span"
          className={classes.signUpText}
          onClick={() => handleCurrentTab(CurrentTabs.signUp)}
          aria-label="switch to sign up"
        >
          Sign up
        </Typography>
      </Box>
    </Box>
  );
};

export default SignIn;
{
}
