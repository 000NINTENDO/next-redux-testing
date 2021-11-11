import {
  Alert,
  Button,
  CircularProgress,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { makeStyles, createStyles } from "@mui/styles";
import { CurrentTabs } from "../pages";
import authService from "../api/authRepository/auth";
import axios from "axios";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    signInButton: {
      background: "#1e9cf1",
      borderRadius: `30px`,
      width: "50%",
      minWidth: `300px`,
      height: `50px`,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
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
  handleCurrentTab?: any;
}

let alertTimeout;

const SignUp = ({ handleCurrentTab }: SignUpInterface) => {
  const classes = useStyles();
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState("");
  const [signUpState, setSignUpState] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (errors.length) setErrors([]);

    setSignUpState({
      ...signUpState,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    setErrors([]);
    setIsLoading(true);
    setSignUpSuccess("");

    let _errors = [];

    if (!signUpState.username) _errors.push("Username is required!");
    if (!signUpState.firstname) _errors.push("Firstname is required!");
    if (!signUpState.lastname) _errors.push("Lastname is required!");
    if (!signUpState.password) _errors.push("Password is required!");

    if (_errors.length) {
      setErrors([..._errors]);
      setIsLoading(false);
      return;
    }

    authService.signUp(signUpState).then((res) => {
      if (res) {
        setIsLoading(false);
        if (!res?.data?.success && res?.data?.message) {
          const _errors = [];
          _errors.push(res?.data?.message);
          setErrors(_errors);
          alertTimeout = setTimeout(() => setErrors([]), 5000);
        }

        if (res?.data?.success && res?.data?.message && res?.data?.data) {
          localStorage.setItem("userDetails", JSON.stringify(res?.data?.data));
          setSignUpSuccess("Registered successfully.");
          setSignUpState({
            ...signUpState,
            firstname: "",
            lastname: "",
            username: "",
            password: "",
          });

          alertTimeout = setTimeout(() => setSignUpSuccess(""), 5000);
        }
      }
    });
  };

  useEffect(() => {
    return () => clearTimeout(alertTimeout);
  }, []);

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
        <TextField
          variant="outlined"
          label="First name"
          fullWidth={true}
          name="firstname"
          role="textbox"
          aria-label="firstname"
          onChange={handleChange}
          inputProps={{
            "data-testid": "firstname",
          }}
        />
      </Box>
      <Box marginBottom={2} width="50%" minWidth="300px">
        <TextField
          variant="outlined"
          label="Last name"
          fullWidth={true}
          name="lastname"
          role="textbox"
          onChange={handleChange}
          inputProps={{
            "data-testid": "lastname",
          }}
        />
      </Box>
      <Box marginBottom={2} width="50%" minWidth="300px">
        <TextField
          variant="outlined"
          label="Phone, email or username"
          fullWidth={true}
          name="username"
          role="textbox"
          onChange={handleChange}
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
          name="password"
          role="textbox"
          className={classes.inputField}
          onChange={handleChange}
          inputProps={{
            "data-testid": "password",
          }}
        />
      </Box>
      <Box marginBottom={2} width="50%" minWidth="300px">
        {errors.map((error, id) => (
          <Box marginBottom={2} key={id}>
            <Alert severity="error" role="alert" aria-label="error-alert">
              {error}
            </Alert>
          </Box>
        ))}

        {signUpSuccess && (
          <Alert severity="success" aria-label="Success alert" role="alert">
            {signUpSuccess}
          </Alert>
        )}
      </Box>
      <Button
        variant="contained"
        className={classes.signInButton}
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <CircularProgress
            data-testid="circular-progress-bar"
            size={30}
            color="secondary"
          />
        ) : (
          "Sign Up"
        )}
      </Button>
      <Box marginTop={2}>
        <Typography component="span">Already have an account?</Typography>
        <Typography
          component="span"
          className={classes.signUpText}
          onClick={() => handleCurrentTab(CurrentTabs.signIn)}
          aria-label="switch to sign in"
        >
          Sign In
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUp;
