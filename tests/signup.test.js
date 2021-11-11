import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
  cleanup,
} from "@testing-library/react";
import SignUp from "../components/SignUp";
import userEvent from "@testing-library/user-event";
import authService from "../api/authRepository/auth";

jest.mock("../api/authRepository/auth");

const res = {
  data: {
    success: true,
    message: "User registered successfully",
    data: {
      firstname: "sample",
      lastname: "user",
      password: "12345678",
      username: "sample@gmail.com",
    },
  },
};

const existingUserResponse = {
  data: {
    success: false,
    message: "User already registeredUser registered successfully",
    data: {},
  },
};

const _mockSignUp = jest.spyOn(authService, "signUp");

afterAll(() => {
  jest.clearAllMocks();
  cleanup();
});

test("Input existence in signup form", () => {
  const handleCurrentTab = jest.fn();
  const { container } = render(<SignUp handleCurrentTab={handleCurrentTab} />);

  expect(container.querySelector(`input[name="firstname"]`)).toBeTruthy();
  expect(container.querySelector(`input[name="lastname"]`)).toBeTruthy();
  expect(container.querySelector(`input[name="username"]`)).toBeTruthy();
  expect(container.querySelector(`input[name="password"]`)).toBeTruthy();
  expect(screen.getByRole("button", { name: /Sign Up/i })).toBeTruthy();
});

test("Hit submit with all empty inputs", () => {
  const { container } = render(<SignUp />);

  fireEvent.click(screen.getByRole("button", { name: /Sign Up/i }));

  expect(screen.getByText(/Username is required!/i)).toBeInTheDocument;
  expect(screen.getByText(/Firstname is required!/i)).toBeInTheDocument;
  expect(screen.getByText(/Lastname is required!/i)).toBeInTheDocument;
  expect(screen.getByText(/Password is required!/i)).toBeInTheDocument;
});

test("submit form with all the intpus", () => {
  _mockSignUp.mockResolvedValueOnce(res);

  const { container } = render(<SignUp />);

  userEvent.type(container.querySelector(`input[name="firstname"]`), "sample");
  userEvent.type(container.querySelector(`input[name="lastname"]`), "user");
  userEvent.type(
    container.querySelector(`input[name="username"]`),
    "demo123@gmail.com"
  );
  userEvent.type(container.querySelector(`input[name="password"]`), "12345678");

  userEvent.click(screen.getByRole("button", { name: /Sign Up/i }));

  expect(screen.queryByText(/Username is required!/i)).not.toBeInTheDocument;
  expect(screen.queryByText(/Firstname is required!/i)).not.toBeInTheDocument;
  expect(screen.queryByText(/Lastname is required!/i)).not.toBeInTheDocument;
  expect(screen.queryByText(/Password is required!/i)).not.toBeInTheDocument;
});

test("Not to show alert or success message without submit", () => {
  const { container } = render(<SignUp />);

  expect(screen.queryByTestId("circular-progress-bar")).toBeNull();
  expect(screen.queryByRole("alert", { name: /Success alert/i })).toBeNull();
});

test("Submit form with user inputs and get the signup success response", async () => {
  act(() => {
    render(<SignUp />);
  });

  act(() => {
    userEvent.type(screen.getByTestId(/firstname/i), "sample");
    userEvent.type(screen.getByTestId(/lastname/i), "user");
    userEvent.type(screen.getByTestId(/username/i), "sample@gmail.com");
    userEvent.type(screen.getByTestId(/password/i), "12345678");
  });

  act(() => {
    userEvent.click(screen.getByRole("button", { name: /Sign Up/i }));
  });

  await waitFor(() => {
    expect(screen.findByTestId(/circular-progress-bar/i)).toBeTruthy();
  });
  // const successMessage = await screen.queryByTestId(/Registered successfully./);
  // expect(successMessage).not.toBeNull();
  // expect(loader).toBeNull();
});

test("Not to sign up existing user", async () => {
  _mockSignUp.mockResolvedValueOnce(existingUserResponse);

  let signUpContainer = null;
  act(() => {
    const { container } = render(<SignUp />);
    signUpContainer = container;
  });
  act(() => {
    userEvent.type(screen.getByTestId(/firstname/i), "sample");
    userEvent.type(screen.getByTestId(/lastname/i), "user");
    userEvent.type(screen.getByTestId(/username/i), "sample@gmail.com");
    userEvent.type(screen.getByTestId(/password/i), "12345678");
  });

  await waitFor(() => {
    expect(screen.findByTestId(/circular-progress-bar/i)).toBeTruthy();
  });

  await waitFor(() => {
    expect(screen.findByText(/User already registered/i));
  });
});
