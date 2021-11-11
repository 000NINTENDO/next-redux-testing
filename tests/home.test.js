import { act, render, screen, waitFor } from "@testing-library/react";
import useEvent from "@testing-library/user-event";
import Home from "../pages/index";

test("Twitter logo image existence in currunt view", () => {
  act(() => {
    render(<Home />);
  });

  expect(screen.getByAltText(/twitter logo/i)).toBeInTheDocument;
});

test("Sign up/Sign in form switching", async () => {
  act(() => {
    render(<Home />);
  });

  for (let i = 0; i <= 10; i++) {
    expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument;
    expect(screen.getByTestId(/firstname/i)).toBeInTheDocument;
    expect(screen.getByTestId(/lastname/i)).toBeInTheDocument;
    expect(screen.getByTestId(/username/i)).toBeInTheDocument;
    expect(screen.getByTestId(/password/i)).toBeInTheDocument;
    const signUpButton = screen.getByRole("button", { name: /Sign Up/i });
    expect(signUpButton).toBeInTheDocument;

    act(() => {
      useEvent.click(screen.getByLabelText(/switch to sign in/i));
    });

    await waitFor(() => {
      expect(screen.findByRole("heading", { name: /sign in/i })).toBeTruthy();
      expect(screen.getByTestId(/username/i)).toBeInTheDocument;
      expect(screen.getByTestId(/password/i)).toBeInTheDocument;
    });

    act(() => {
      useEvent.click(screen.getByLabelText(/switch to sign up/i));
    });

    await waitFor(() => {
      expect(screen.findByRole("button", { name: /sign up/i }))
        .toBeInTheDocument;
      expect(screen.getByTestId(/firstname/i)).toBeInTheDocument;
      expect(screen.getByTestId(/lastname/i)).toBeInTheDocument;
      expect(screen.getByTestId(/username/i)).toBeInTheDocument;
      expect(screen.getByTestId(/password/i)).toBeInTheDocument;
    });
  }
});
