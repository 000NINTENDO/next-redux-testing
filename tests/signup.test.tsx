import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignUp from "../components/SignUp";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { rest } from "msw";

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

  expect(screen.getByText(/Username is required!/!)).toBeInTheDocument;
  expect(screen.getByText(/Firstname is required!/!)).toBeInTheDocument;
  expect(screen.getByText(/Lastname is required!/!)).toBeInTheDocument;
  expect(screen.getByText(/Password is required!/!)).toBeInTheDocument;
});

test("submit form with all the intpus", () => {
  const { container } = render(<SignUp />);

  userEvent.type(container.querySelector(`input[name="firstname"]`), "sample");
  userEvent.type(container.querySelector(`input[name="lastname"]`), "user");
  userEvent.type(
    container.querySelector(`input[name="username"]`),
    "demo123@gmail.com"
  );
  userEvent.type(container.querySelector(`input[name="password"]`), "12345678");

  userEvent.click(screen.getByRole("button", { name: /Sign Up/i }));

  expect(screen.queryByText(/Username is required!/!)).not.toBeInTheDocument;
  expect(screen.queryByText(/Firstname is required!/!)).not.toBeInTheDocument;
  expect(screen.queryByText(/Lastname is required!/!)).not.toBeInTheDocument;
  expect(screen.queryByText(/Password is required!/!)).not.toBeInTheDocument;
});

test("Not to show alert or success message without submit", () => {
  const { container } = render(<SignUp />);

  expect(screen.queryByTestId("circular-progress-bar")).toBeNull();
  expect(screen.queryByRole("alert", { name: /Success alert/i })).toBeNull();
});

const url = process.env.NEXT_PUBLIC_TWITTER_API;
const signUpUrl = `${url}/user/signup`;

const server = setupServer(
  rest.post(signUpUrl, (req, res, ctx) => {
    return res(
      ctx.delay(1500),
      ctx.json({
        success: true,
        message: "User registered successfully",
        data: {
          firstname: "sample",
          lastname: "user",
          password: "12345678",
          username: "sample@gmail.com",
        },
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Submit form with user inputs and get the signup success response", async () => {
  const { container } = render(<SignUp />);

  server;

  userEvent.type(container.querySelector(`input[name="firstname"]`), "sample");
  userEvent.type(container.querySelector(`input[name="lastname"]`), "user");
  userEvent.type(
    container.querySelector(`input[name="username"]`),
    "sample@gmail.com"
  );
  userEvent.type(container.querySelector(`input[name="password"]`), "12345678");

  fireEvent.click(screen.getByRole("button", { name: /Sign Up/i }));

  const loader = await screen.queryByTestId(/circular-progress-bar/i);

  expect(loader).toBeTruthy();

  const successMessage = await screen.queryByTestId(/Registered successfully./);
  expect(successMessage).not.toBeNull();
  expect(loader).toBeNull();
});
