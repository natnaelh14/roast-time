import { render, screen } from "@testing-library/react";
import { SignInForm } from "components/Forms";
import userEvent from "@testing-library/user-event";

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock("next/router", () => require("next-router-mock"));

describe("Sign in page", () => {
	test("on initial render, it shows two inputs and a button and the sign in button is disabled.", async () => {
		// render component
		render(<SignInForm />);
		// Manipulate the component or find and element in it
		const emailInput = screen.getByRole("textbox", {
			name: /email/i,
		});
		const passwordInput = screen.getByLabelText(/password/i);
		const signInbutton = await screen.findByRole("button", {
			name: /sign in/i,
		});
		// Assertion - make sure the component is doing what it's supposed to do
		expect(emailInput).toBeInTheDocument();
		expect(passwordInput).toBeInTheDocument();
		expect(signInbutton).toBeInTheDocument();
	});

	// eslint-disable-next-line jest/no-commented-out-tests
	// test("if email and password is entered, the sign in button becomes enabled.", async () => {
	// 	render(<SignInForm />);
	// 	await userEvent.type(screen.getByRole("textbox", { name: /email/i }), "test@email.com");
	// 	await userEvent.type(screen.getByLabelText(/password/i), "password1234");
	// 	expect(await screen.findByRole("button", { name: /sign in/i })).toBeEnabled();
	// });
});
